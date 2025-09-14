import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Select,
  SelectItem,
  DatePicker,
  Textarea,
  Card,
  CardBody,
  Chip,
  Divider
} from "@heroui/react";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  User, 
  Phone, 
  MessageSquare,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const SchedulePickupModal = ({ isOpen, onClose, farmerData, onSchedule }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = [
    { key: "06:00", label: "6:00 AM - Early Morning" },
    { key: "08:00", label: "8:00 AM - Morning" },
    { key: "10:00", label: "10:00 AM - Mid Morning" },
    { key: "12:00", label: "12:00 PM - Noon" },
    { key: "14:00", label: "2:00 PM - Afternoon" },
    { key: "16:00", label: "4:00 PM - Late Afternoon" },
    { key: "18:00", label: "6:00 PM - Evening" }
  ];

  const vehicleTypes = [
    { key: "small", label: "Small Truck (up to 1 ton)", description: "For smaller quantities" },
    { key: "medium", label: "Medium Truck (1-5 tons)", description: "Most common choice" },
    { key: "large", label: "Large Truck (5+ tons)", description: "For bulk collections" },
    { key: "refrigerated", label: "Refrigerated Vehicle", description: "Temperature controlled" }
  ];

  const handleSchedule = async () => {
    if (!selectedDate || !selectedTime || !vehicleType) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const scheduleData = {
        date: selectedDate,
        time: selectedTime,
        vehicleType,
        notes,
        farmerId: farmerData?.id,
        estimatedDuration: "45 minutes"
      };
      
      onSchedule?.(scheduleData);
      onClose();
    } catch (error) {
      console.error("Failed to schedule pickup:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = selectedDate && selectedTime && vehicleType;

  return (
    <Modal 
      isOpen={isOpen} 
      scrollBehavior="inside"
      onClose={onClose}
      size="2xl"
      backdrop="blur"
      classNames={{
        backdrop: "bg-black/50 backdrop-opacity-40",
        base: "border-none bg-gradient-to-br from-white to-slate-50",
        header: "border-b-[1px] border-slate-200",
        body: "py-6",
        footer: "border-t-[1px] border-slate-200"
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-2 text-2xl font-bold text-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            Schedule Pickup
          </div>
          <p className="text-sm font-normal text-slate-600">
            Coordinate collection time with {farmerData?.name}
          </p>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-6">
            
            {/* Farmer Info Card */}
            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-800">{farmerData?.name}</h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>{farmerData?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>{farmerData?.contactInfo?.phone}</span>
                      </div>
                    </div>
                  </div>
                  <Chip color="success" variant="flat" size="sm">
                    {farmerData?.quantity} Ready
                  </Chip>
                </div>
              </CardBody>
            </Card>

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Calendar className="inline w-4 h-4 mr-2" />
                Pickup Date
              </label>
              <DatePicker
                value={selectedDate}
                onChange={setSelectedDate}
                className="w-full"
                minValue={new Date()}
                maxValue={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 days from now
                classNames={{
                  base: "w-full",
                  input: "text-base"
                }}
              />
            </div>

            {/* Time Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Clock className="inline w-4 h-4 mr-2" />
                Preferred Time
              </label>
              <Select
                value={selectedTime}
                onSelectionChange={setSelectedTime}
                placeholder="Choose a time slot"
                className="w-full"
                classNames={{
                  trigger: "text-base"
                }}
              >
                {timeSlots.map((slot) => (
                  <SelectItem key={slot.key} value={slot.key}>
                    {slot.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <Truck className="inline w-4 h-4 mr-2" />
                Vehicle Requirements
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicleTypes.map((vehicle) => (
                  <div
                    key={vehicle.key}
                    className={`
                      p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                      ${vehicleType === vehicle.key 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                      }
                    `}
                    onClick={() => setVehicleType(vehicle.key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-slate-800">{vehicle.label}</h4>
                      {vehicleType === vehicle.key && (
                        <CheckCircle2 className="w-5 h-5 text-blue-600" />
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{vehicle.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Special Instructions */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                <MessageSquare className="inline w-4 h-4 mr-2" />
                Special Instructions (Optional)
              </label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requirements, access instructions, or notes for the driver..."
                className="w-full"
                minRows={3}
                classNames={{
                  input: "text-base"
                }}
              />
            </div>

            {/* Summary */}
            {isFormValid && (
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-2">Pickup Summary</h4>
                      <div className="space-y-1 text-sm text-green-700">
                        <p><strong>Date:</strong> {selectedDate?.toLocaleDateString('en-IN', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                        <p><strong>Time:</strong> {timeSlots.find(slot => slot.key === selectedTime)?.label}</p>
                        <p><strong>Vehicle:</strong> {vehicleTypes.find(v => v.key === vehicleType)?.label}</p>
                        <p><strong>Estimated Duration:</strong> 45 minutes</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}

            {/* Validation Warning */}
            {!isFormValid && selectedDate && (
              <Card className="bg-amber-50 border border-amber-200">
                <CardBody className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Complete Required Fields</h4>
                      <p className="text-sm text-amber-700">
                        Please select a time slot and vehicle type to proceed with scheduling.
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </ModalBody>

        <ModalFooter>
          <Button 
            color="default" 
            variant="bordered" 
            onPress={onClose}
            size="lg"
          >
            Cancel
          </Button>
          <Button 
            color="primary" 
            variant="shadow" 
            onPress={handleSchedule}
            disabled={!isFormValid || isSubmitting}
            isLoading={isSubmitting}
            size="lg"
            startContent={!isSubmitting && <Calendar className="w-4 h-4" />}
          >
            {isSubmitting ? "Scheduling..." : "Schedule Pickup"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SchedulePickupModal;
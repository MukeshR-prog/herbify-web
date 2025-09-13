"use client";
import { Button, Chip, Card, CardHeader, CardBody, CardFooter, Avatar } from "@heroui/react";
import { FaCheck, FaTimes } from "react-icons/fa";

const FarmerRequestCard = ({ request, onApprove, onReject }) => {
  return (
    <Card shadow="sm" className="w-full max-w-sm">
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar src={request.image} size="lg" />
          <div>
            <h3 className="font-semibold text-gray-800">{request.name}</h3>
            <p className="text-sm text-gray-500">Farmer ID: {request.id}</p>
          </div>
        </div>
        <Chip
          color="warning"
          variant="flat"
          className="text-xs"
        >
          {request.addedDate}
        </Chip>
      </CardHeader>

      <CardBody className="space-y-2">
        <p><strong>Herb Type:</strong> {request.herb}</p>
        <p><strong>Quantity:</strong> {request.quantity}</p>
        <p>
          <strong>Expected Quality:</strong>{" "}
          <span className="text-green-600 font-medium">{request.quality}</span>
        </p>
        <p><strong>Location:</strong> {request.location}</p>

        <div className="p-3 bg-gray-50 rounded-md text-sm">
          <p className="font-medium text-gray-700">Farmer Notes:</p>
          <p className="text-gray-600">{request.notes}</p>
        </div>
      </CardBody>

      <CardFooter className="flex justify-between">
        <Button
         className="bg-green-300"
          
          variant="solid"
          startContent={<FaCheck />}
          onPress={() => onApprove(request.id)}
        >
          Approve
        </Button>
        <Button
          color="danger"
          variant="bordered"
          startContent={<FaTimes />}
          onPress={() => onReject(request.id)}
        >
          Reject
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FarmerRequestCard;

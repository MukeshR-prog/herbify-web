"use client";
import React, { useState, useMemo } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Select,
  SelectItem,
  Button,
  Pagination,
  Checkbox,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import {
  FaSearch,
  FaPlus,
  FaDownload,
  FaLeaf,
  FaSeedling,
  FaTree,
  FaSpa,
  FaCheckSquare,
} from "react-icons/fa";

// Map each herb type to an icon + color
const herbIcons = {
  Turmeric: {
    icon: <FaLeaf className="text-green-600" />,
    color: "bg-green-100",
  },
  Ashwagandha: {
    icon: <FaSpa className="text-purple-600" />,
    color: "bg-purple-100",
  },
  Neem: { icon: <FaTree className="text-red-600" />, color: "bg-red-100" },
  Ginger: {
    icon: <FaSeedling className="text-yellow-600" />,
    color: "bg-yellow-100",
  },
  Tulsi: {
    icon: <FaLeaf className="text-emerald-600" />,
    color: "bg-emerald-100",
  },
  Amla: {
    icon: <FaSeedling className="text-lime-600" />,
    color: "bg-lime-100",
  },
  Brahmi: { icon: <FaSpa className="text-teal-600" />, color: "bg-teal-100" },
  Fenugreek: {
    icon: <FaSeedling className="text-orange-600" />,
    color: "bg-orange-100",
  },
  Cardamom: {
    icon: <FaLeaf className="text-emerald-700" />,
    color: "bg-emerald-100",
  },
  Cinnamon: {
    icon: <FaTree className="text-amber-700" />,
    color: "bg-amber-100",
  },
};

// Helpers
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const HerbsDataTable = ({ 
  data, 
  enableBatchCreation = false, 
  onBatchCreated = () => {},
  title = "Existing Stock Inventory",
  subtitle = "Manage and monitor your herbal stock batches",
  onViewDetails = null
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Expiry Date");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [selectedItems, setSelectedItems] = useState([]);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [batchName, setBatchName] = useState("");

  // Categories
  const categories = useMemo(() => {
    return [
      "All Categories",
      ...new Set(data.map((item) => item.herbType.split(" ")[0])),
    ];
  }, [data]);

  // Handle checkbox selection
  const handleItemSelect = (batchId, isSelected) => {
    setSelectedItems(prev => 
      isSelected 
        ? [...prev, batchId]
        : prev.filter(id => id !== batchId)
    );
  };

  // Handle batch creation
  const handleCreateBatch = () => {
    if (selectedItems.length === 0) return;
    
    const batchId = `PRC-${Date.now()}`;
    const batchDetails = {
      batchId,
      batchName,
      selectedItems,
    };
    
    onBatchCreated(batchDetails);
    
    // Reset state
    setSelectedItems([]);
    setBatchName("");
    setIsBatchModalOpen(false);
  };

  // Filter & Sort
  const filteredData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch =
        item.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.herbType.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" ||
        item.herbType.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Expiry Date":
          return (b.expiryDays || 0) - (a.expiryDays || 0); // Higher expiry days first
        case "Batch ID":
          return a.batchId.localeCompare(b.batchId);
        default:
          return 0;
      }
    });

    return filtered;
  }, [data, searchTerm, selectedCategory, sortBy]);

  // Pagination
  const pages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filteredData.slice(start, start + rowsPerPage);
  }, [filteredData, page]);

  return (
    <>
      <Card className="shadow-md">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">
            {subtitle}
          </p>
        </div>
        <div className="flex gap-3">
          {enableBatchCreation && (
            <Button 
              color="primary" 
              startContent={<FaCheckSquare />}
              onPress={() => setIsBatchModalOpen(true)}
              isDisabled={selectedItems.length === 0}
            >
              Create Batch {selectedItems.length > 0 && `(${selectedItems.length})`}
            </Button>
          )}
          <Button color="success" startContent={<FaPlus />}>
            Add Stock
          </Button>
          <Button variant="bordered" startContent={<FaDownload />}>
            Export
          </Button>
        </div>
      </CardHeader>

      <CardBody>
        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div className="w-full md:w-64">
            <Input
              placeholder="Search by Batch ID or Herb..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<FaSearch />}
              className="w-full"
            />
          </div>
          {/* Left side - dropdowns */}
          <div className="flex gap-4 w-full md:w-auto">
            <Select
              label="Category"
              selectedKeys={[selectedCategory]}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-40"
            >
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Sort By"
              selectedKeys={[sortBy]}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-40"
            >
              <SelectItem key="Expiry Date">Expiry Date</SelectItem>
              <SelectItem key="Batch ID">Batch ID</SelectItem>
            </Select>
          </div>

          {/* Right side - search */}
        </div>

        {/* Table */}
        <Table aria-label="Inventory Table">
          <TableHeader>
            <TableColumn key="select" className={enableBatchCreation ? "" : "hidden"}>Select</TableColumn>
            <TableColumn key="batchId">Batch ID</TableColumn>
            <TableColumn key="batchName">Batch Name</TableColumn>
            <TableColumn key="quantity">Quantity</TableColumn>
            <TableColumn key="actions">Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No batches found"}>
            {paginatedData.map((item) => {
              const herb = herbIcons[item.herbType] || {
                icon: <FaLeaf />,
                color: "bg-gray-100",
              };

              return (
                <TableRow key={item.batchId}>
                  <TableCell className={enableBatchCreation ? "" : "hidden"}>
                    <Checkbox
                      isSelected={selectedItems.includes(item.batchId)}
                      onValueChange={(isSelected) => handleItemSelect(item.batchId, isSelected)}
                    />
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold">{item.batchId}</p>
                      <p className="text-xs text-gray-500">
                        Added: {formatDate(item.addedDate)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`p-2 rounded-full ${herb.color}`}>
                        {herb.icon}
                      </span>
                      <div>
                        <p className="font-medium">{item.herbType}</p>
                        <p className="text-xs text-gray-500">
                          {item.scientificName}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {item.quantity} ({item.bags} bags)
                  </TableCell>
                  <TableCell>
                    {onViewDetails ? (
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                        onPress={() => onViewDetails(item)}
                      >
                        View Details
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        color="primary"
                        variant="flat"
                      >
                        Dispatch
                      </Button>
                    )}
                  </TableCell>
                  
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-gray-500">
            Showing {(page - 1) * rowsPerPage + 1} -{" "}
            {Math.min(page * rowsPerPage, filteredData.length)} of{" "}
            {filteredData.length}
          </p>
          <Pagination
            page={page}
            total={pages}
            onChange={setPage}
            color="success"
            showControls
          />
        </div>
      </CardBody>
    </Card>

    {/* Batch Creation Modal */}
    <Modal 
      isOpen={isBatchModalOpen} 
      onOpenChange={setIsBatchModalOpen}
      size="md"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-lg font-semibold">Create New Batch</h3>
              <p className="text-sm text-gray-600">
                {selectedItems.length} item{selectedItems.length !== 1 ? 's' : ''} selected
              </p>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Batch Name"
                  placeholder="Enter batch name"
                  value={batchName}
                  onChange={(e) => setBatchName(e.target.value)}
                  className="w-full"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={handleCreateBatch}
                isDisabled={!batchName.trim()}
              >
                Create Batch
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default HerbsDataTable;

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
  Chip,
  Tooltip,
  Progress,
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
  FaQrcode,
  FaEllipsisV,
  FaLeaf,
  FaSeedling,
  FaTree,
  FaSpa,
} from "react-icons/fa";
import QRCode from "react-qr-code";

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

const getDaysLeft = (expiryDateStr) => {
  const today = new Date();
  const expiry = new Date(expiryDateStr);
  const diff = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
  return diff;
};

const getExpiryStatus = (expiryDateStr) => {
  const days = getDaysLeft(expiryDateStr);
  if (days < 0) return { text: "Expired", color: "danger", urgent: true };
  if (days <= 7)
    return { text: `${days} days left`, color: "danger", urgent: true };
  if (days <= 30)
    return { text: `${days} days left`, color: "warning", urgent: false };
  return { text: `${days} days left`, color: "success", urgent: false };
};

const HerbsDataTable = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Expiry Date");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  // Categories
  const categories = useMemo(() => {
    return [
      "All Categories",
      ...new Set(data.map((item) => item.herbType.split(" ")[0])),
    ];
  }, [data]);

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
          return new Date(a.expiryDays) - new Date(b.expiryDays);
        case "Quality Score":
          return b.qualityScore - a.qualityScore;
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
  const [selectedBatch, setSelectedBatch] = useState(null);

  const handleOpenModal = (item) => {
    setSelectedBatch(item);
  };

  const handleCloseModal = () => {
    setSelectedBatch(null);
  };
  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold">Existing Stock Inventory</h2>
          <p className="text-sm text-gray-500">
            Manage and monitor your herbal stock batches
          </p>
        </div>
        <div className="flex gap-3">
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
              <SelectItem key="Quality Score">Quality Score</SelectItem>
              <SelectItem key="Batch ID">Batch ID</SelectItem>
            </Select>
          </div>

          {/* Right side - search */}
        </div>

        {/* Table */}
        <Table aria-label="Inventory Table">
          <TableHeader>
            <TableColumn>Batch ID</TableColumn>
            <TableColumn>Herb</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Quality</TableColumn>
            <TableColumn>Expiry</TableColumn>
            <TableColumn>QR</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"No herbs found"}>
            {paginatedData.map((item) => {
              const expiry = getExpiryStatus(item.expiryDays);
              const herb = herbIcons[item.herbType] || {
                icon: <FaLeaf />,
                color: "bg-gray-100",
              };

              return (
                <TableRow key={item.batchId}>
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
                  <TableCell className="w-40">
                    <Progress
                      value={item.qualityScore}
                      color={
                        item.qualityScore >= 80
                          ? "success"
                          : item.qualityScore >= 60
                          ? "warning"
                          : "danger"
                      }
                      className="h-2"
                    />
                    <p className="text-xs mt-1 text-gray-600">
                      {item.qualityScore}%
                    </p>
                  </TableCell>
                  <TableCell>
                    <Chip
                      color={expiry.color}
                      variant="flat"
                      className="text-sm font-medium"
                    >
                      {expiry.text}
                    </Chip>
                    <p className="text-xs text-gray-500">
                      Exp: {formatDate(item.expiryDays)}
                    </p>
                  </TableCell>
                  <TableCell>
                         <Tooltip content="View QR">
                  <Button
                    isIconOnly
                    size="sm"
                    variant="light"
                    onPress={() => handleOpenModal(item)}
                  >
                    <FaQrcode />
                  </Button>
                </Tooltip>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      color={expiry.urgent ? "danger" : "primary"}
                      variant="flat"
                    >
                      {expiry.urgent ? "Urgent" : "Dispatch"}
                    </Button>
                    <Button isIconOnly size="sm" variant="light">
                      <FaEllipsisV />
                    </Button>
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
      <Modal isOpen={!!selectedBatch} onOpenChange={handleCloseModal}>
        <ModalContent>
          <ModalHeader className="text-xl font-bold">
            Batch Details
          </ModalHeader>
          <ModalBody>
            {selectedBatch && (
              <div className="space-y-3">
                <p>
                  <strong>Batch ID:</strong> {selectedBatch.batchId}
                </p>
                <p>
                  <strong>Herb Type:</strong> {selectedBatch.herbType}
                </p>
                <p>
                  <strong>Scientific Name:</strong> {selectedBatch.scientificName}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedBatch.quantity} ({selectedBatch.bags} bags)
                </p>
                <p>
                  <strong>Quality Score:</strong> {selectedBatch.qualityScore}%
                </p>
                <p>
                  <strong>Expiry Date:</strong> {formatDate(selectedBatch.expiryDays)}
                </p>

                {/* QR Code */}
                <div className="flex justify-center py-4">
                  <QRCode
                    value={`Batch ID: ${selectedBatch.batchId} | Herb: ${selectedBatch.herbType}`}
                    size={128}
                  />
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleCloseModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default HerbsDataTable;

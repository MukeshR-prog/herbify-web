import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell,
  Badge,
  Chip,
  Input,
  Select,
  SelectItem,
  Button,
  Pagination
} from "@heroui/react";
import { 
  Search, 
  Filter, 
  Package, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  ExternalLink,
  Calendar,
  User
} from "lucide-react";
import { useRouter } from "next/navigation";

const StockTable = ({ 
  data = [], 
  type = "instock", // "instock" or "dispatched"
  onRowClick = null,
  searchPlaceholder = "Search by Batch ID, Herb Name...",
  emptyMessage = "No stock data available"
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter data based on search and filter
  const filteredData = data.filter(item => {
    const matchesSearch = searchTerm === "" || 
      Object.values(item).some(value => 
        value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    const matchesFilter = statusFilter === "all" || 
      (item.status && item.status.toLowerCase() === statusFilter.toLowerCase()) ||
      (item.expiryRisk && statusFilter === "expiring" && item.expiryRisk === "High");
    
    return matchesSearch && matchesFilter;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    } else {
      // Default navigation
      router.push(`/collector/farmer-request/${item.id}`);
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      available: { color: "success", label: "Available" },
      "expiring soon": { color: "warning", label: "Expiring Soon" },
      expired: { color: "danger", label: "Expired" },
      "in transit": { color: "primary", label: "In Transit" },
      delivered: { color: "success", label: "Delivered" },
      completed: { color: "success", label: "Completed" },
      pending: { color: "warning", label: "Pending" }
    };
    return configs[status?.toLowerCase()] || { color: "default", label: status };
  };

  const getExpiryRiskConfig = (risk) => {
    const configs = {
      low: { color: "success", label: "Low Risk" },
      medium: { color: "warning", label: "Medium Risk" }, 
      high: { color: "danger", label: "High Risk" }
    };
    return configs[risk?.toLowerCase()] || { color: "default", label: risk };
  };

  const filterOptions = type === "instock" 
    ? [
        { key: "all", label: "All Status" },
        { key: "available", label: "Available" },
        { key: "expiring", label: "Expiring Soon" },
        { key: "expired", label: "Expired" }
      ]
    : [
        { key: "all", label: "All Status" },
        { key: "in transit", label: "In Transit" },
        { key: "delivered", label: "Delivered" },
        { key: "completed", label: "Completed" },
        { key: "pending", label: "Pending" }
      ];

  const renderInstockColumns = () => (
    <TableHeader>
      <TableColumn>BATCH INFO</TableColumn>
      <TableColumn>HERB DETAILS</TableColumn>
      <TableColumn>QUANTITY</TableColumn>
      <TableColumn>SOURCE</TableColumn>
      <TableColumn>RECEIVED DATE</TableColumn>
      <TableColumn>EXPIRY RISK</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
  );

  const renderDispatchedColumns = () => (
    <TableHeader>
      <TableColumn>DISPATCH INFO</TableColumn>
      <TableColumn>HERB DETAILS</TableColumn>
      <TableColumn>QUANTITY</TableColumn>
      <TableColumn>MANUFACTURER</TableColumn>
      <TableColumn>DISPATCH DATE</TableColumn>
      <TableColumn>STATUS</TableColumn>
    </TableHeader>
  );

  const renderInstockRow = (item) => (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-slate-50 transition-colors"
      onClick={() => handleRowClick(item)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">#{item.batchId}</p>
            <p className="text-xs text-slate-500">Batch ID</p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-medium text-slate-900">{item.herbName}</p>
          <p className="text-sm text-slate-600">{item.herbType || 'Medicinal Herb'}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-semibold text-slate-900">{item.quantity}</p>
          <p className="text-xs text-slate-500">{item.unit || 'kg'}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-500" />
          <div>
            <p className="font-medium text-slate-900">{item.source}</p>
            <p className="text-xs text-slate-500">{item.sourceType || 'Farmer'}</p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <p className="text-sm text-slate-700">{item.dateReceived}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <Chip
          size="sm"
          variant="flat"
          color={getExpiryRiskConfig(item.expiryRisk).color}
        >
          {getExpiryRiskConfig(item.expiryRisk).label}
        </Chip>
      </TableCell>
      
      <TableCell>
        <Chip
          size="sm"
          variant="flat"
          color={getStatusConfig(item.status).color}
        >
          {getStatusConfig(item.status).label}
        </Chip>
      </TableCell>
    </TableRow>
  );

  const renderDispatchedRow = (item) => (
    <TableRow 
      key={item.id}
      className="cursor-pointer hover:bg-slate-50 transition-colors"
      onClick={() => handleRowClick(item)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Package className="w-4 h-4 text-green-600" />
          </div>
          <div>
            <p className="font-semibold text-slate-900">#{item.dispatchId}</p>
            <p className="text-xs text-slate-500">Dispatch ID</p>
          </div>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-medium text-slate-900">{item.herbName}</p>
          <p className="text-sm text-slate-600">{item.herbType || 'Medicinal Herb'}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-semibold text-slate-900">{item.quantitySent}</p>
          <p className="text-xs text-slate-500">{item.unit || 'kg'}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <div>
          <p className="font-medium text-slate-900">{item.manufacturerName}</p>
          <p className="text-xs text-slate-500">{item.manufacturerLocation}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500" />
          <p className="text-sm text-slate-700">{item.dateOfDispatch}</p>
        </div>
      </TableCell>
      
      <TableCell>
        <Chip
          size="sm"
          variant="flat"
          color={getStatusConfig(item.status).color}
        >
          {getStatusConfig(item.status).label}
        </Chip>
      </TableCell>
    </TableRow>
  );

  return (
    <Card className="shadow-lg border border-slate-200">
      <CardBody className="p-0">
        {/* Search and Filter Header */}
        <div className="flex flex-col sm:flex-row gap-4 p-6 border-b border-slate-200">
          <div className="flex-1">
            <Input
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              startContent={<Search className="w-4 h-4 text-slate-400" />}
              variant="bordered"
              className="w-full"
            />
          </div>
          
          <div className="w-full sm:w-48">
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              startContent={<Filter className="w-4 h-4 text-slate-400" />}
              variant="bordered"
            >
              {filterOptions.map((option) => (
                <SelectItem key={option.key} value={option.key}>
                  {option.label}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table 
            aria-label={`${type} stock table`}
            classNames={{
              wrapper: "shadow-none",
              th: "bg-slate-50 text-slate-700 font-semibold",
              td: "py-4"
            }}
          >
            {type === "instock" ? renderInstockColumns() : renderDispatchedColumns()}
            
            <TableBody emptyContent={emptyMessage}>
              {paginatedData.map((item) => 
                type === "instock" ? renderInstockRow(item) : renderDispatchedRow(item)
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center p-6 border-t border-slate-200">
            <Pagination
              total={totalPages}
              page={currentPage}
              onChange={setCurrentPage}
              showControls
              size="sm"
              color="primary"
            />
          </div>
        )}
        
        {/* Results Summary */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200">
          <p className="text-sm text-slate-600">
            Showing {paginatedData.length} of {filteredData.length} results
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default StockTable;
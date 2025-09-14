"use client";
import HerbsDataTable from "@/components/HerbsDataTable";
import { RoleGuard } from "@/components/RoleGuard";
import StatsCard from "@/components/cards/StatsCard";
import { ROLES } from "@/utils/roles";

export default function CollectorDashboard() {
  const statsData = [
    {
      icon: 'users',
      iconBg: 'blue',
      value: '247',
      title: 'Existing Stock Count',
      trend: '+5.2%',
      subtitle: '12 batches added today',
      subtitleIcon: 'up',
      subtitleColor: 'green'
    },
    {
      icon: 'clock',
      iconBg: 'orange',
      value: '12',
      title: 'Pending Requests',
      badge: 'Urgent',
      badgeType: 'warning',
      subtitle: '3 requests > 24hrs old',
      subtitleIcon: 'warning',
      subtitleColor: 'orange'
    },
    {
      icon: 'transactions',
      iconBg: 'green',
      value: '89',
      title: 'Weekly Transactions',
      badge: 'This Week',
      badgeType: 'info',
      subtitle: '73 Completed 16 Pending',
      subtitleIcon: 'check',
      subtitleColor: 'green'
    },
    {
    icon: "alerts",
    iconBg: "red",
    value: "3",
    title: "Spoilage Alerts",
    badge: "Expiring",
    badgeType: "warning",
    subtitle: "3 batches expiring < 48 hrs",
    subtitleIcon: "warning",
    subtitleColor: "orange",
  },
  ]
 const inventoryData = [
  {
    batchId: 'HRB-2024-001',
    addedDate: new Date('2025-09-10T09:30:00Z'), // when added
    herbType: 'Turmeric',
    scientificName: 'Curcuma longa',
    quantity: '250 kg',
    bags: '50',
    qualityScore: 92,
    expiryDays: new Date('2025-10-25T09:30:00Z') // expiry date
  },
  {
    batchId: 'HRB-2024-002',
    addedDate: new Date('2025-09-07T14:15:00Z'),
    herbType: 'Ashwagandha',
    scientificName: 'Withania somnifera',
    quantity: '180 kg',
    bags: '36',
    qualityScore: 78,
    expiryDays: new Date('2025-09-24T14:15:00Z')
  },
  {
    batchId: 'HRB-2024-003',
    addedDate: new Date('2025-09-05T10:00:00Z'),
    herbType: 'Neem Leaves',
    scientificName: 'Azadirachta indica',
    quantity: '75 kg',
    bags: '15',
    qualityScore: 45,
    expiryDays: new Date('2025-09-14T10:00:00Z')
  },
  {
    batchId: 'HRB-2024-004',
    addedDate: new Date('2025-09-09T12:00:00Z'),
    herbType: 'Ginger',
    scientificName: 'Zingiber officinale',
    quantity: '120 kg',
    bags: '24',
    qualityScore: 88,
    expiryDays: new Date('2025-10-12T12:00:00Z')
  },
  {
    batchId: 'HRB-2024-005',
    addedDate: new Date('2025-09-11T16:30:00Z'),
    herbType: 'Tulsi',
    scientificName: 'Ocimum tenuiflorum',
    quantity: '95 kg',
    bags: '19',
    qualityScore: 95,
    expiryDays: new Date('2025-11-10T16:30:00Z')
  },
  {
    batchId: 'HRB-2024-006',
    addedDate: new Date('2025-09-08T09:45:00Z'),
    herbType: 'Amla',
    scientificName: 'Phyllanthus emblica',
    quantity: '200 kg',
    bags: '40',
    qualityScore: 82,
    expiryDays: new Date('2025-10-07T09:45:00Z')
  },
  {
    batchId: 'HRB-2024-007',
    addedDate: new Date('2025-09-06T11:20:00Z'),
    herbType: 'Brahmi',
    scientificName: 'Bacopa monnieri',
    quantity: '65 kg',
    bags: '13',
    qualityScore: 76,
    expiryDays: new Date('2025-09-27T11:20:00Z')
  },
  {
    batchId: 'HRB-2024-008',
    addedDate: new Date('2025-08-29T08:00:00Z'),
    herbType: 'Fenugreek',
    scientificName: 'Trigonella foenum-graecum',
    quantity: '150 kg',
    bags: '30',
    qualityScore: 68,
    expiryDays: new Date('2025-09-20T08:00:00Z')
  },
  {
    batchId: 'HRB-2024-009',
    addedDate: new Date('2025-09-11T18:40:00Z'),
    herbType: 'Cardamom',
    scientificName: 'Elettaria cardamomum',
    quantity: '45 kg',
    bags: '9',
    qualityScore: 91,
    expiryDays: new Date('2025-12-10T18:40:00Z')
  },
  {
    batchId: 'HRB-2024-010',
    addedDate: new Date('2025-09-09T09:30:00Z'),
    herbType: 'Cinnamon',
    scientificName: 'Cinnamomum verum',
    quantity: '80 kg',
    bags: '16',
    qualityScore: 85,
    expiryDays: new Date('2025-10-14T09:30:00Z')
  }
]

  return (
    <RoleGuard allowed={[ROLES.COLLECTOR]}>
  <div className="bg-white text-black min-h-screen p-4" style={{ backgroundColor: '#fff', color: '#000' }}>
  <h2 className="text-2xl font-bold mb-4 text-black">🚚 Collector Dashboard</h2>
  <p className="text-black">Scan packages, verify authenticity, transfer custody.</p>
  <StatsCard stats={statsData} />
  <HerbsDataTable data={inventoryData} />
      </div>
    </RoleGuard>
  );
}

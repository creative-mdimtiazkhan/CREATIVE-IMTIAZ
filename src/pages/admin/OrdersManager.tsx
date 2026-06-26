import React, { useState } from 'react';
import { useAppContext, AppOrder } from '../../context/AppContext';
import { 
  Search, 
  Eye, 
  Trash2, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Sparkles, 
  Mail, 
  Phone, 
  CreditCard,
  Building,
  Info,
  Calendar,
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  ExternalLink,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';

export default function OrdersManager() {
  const { state, updateOrderStatus, deleteOrder } = useAppContext();
  const orders = state.orders || [];

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toggle order expansion
  const toggleExpand = (id: string) => {
    setExpandedOrderId(prev => prev === id ? null : id);
  };

  // Status-badge styling map
  const getStatusBadge = (status: AppOrder['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500/10 border-yellow-500/25 text-yellow-500';
      case 'Processing':
        return 'bg-blue-500/10 border-blue-500/25 text-blue-400 animate-pulse';
      case 'Completed':
        return 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400';
      case 'Cancelled':
        return 'bg-red-500/10 border-red-500/25 text-red-400';
      default:
        return 'bg-zinc-800 text-zinc-400';
    }
  };

  // Sum up revenue for completed sales using safe digit parser
  const calculateRevenue = () => {
    return orders
      .filter(o => o.status === 'Completed')
      .reduce((sum, o) => {
        const priceNum = parseInt(o.productPrice.replace(/[^0-9]/g, ''), 10) || 0;
        return sum + priceNum;
      }, 0);
  };

  // Formatted sum helper
  const formattedRevenue = () => {
    const rawVal = calculateRevenue();
    return `৳${rawVal.toLocaleString('en-US')}`;
  };

  // Filter and search computation
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = !query || 
      o.id.toLowerCase().includes(query) ||
      o.fullName.toLowerCase().includes(query) ||
      o.email.toLowerCase().includes(query) ||
      o.phone.toLowerCase().includes(query) ||
      o.productName.toLowerCase().includes(query) ||
      o.transactionId.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = (orderId: string, status: AppOrder['status']) => {
    updateOrderStatus(orderId, status);
  };

  const handleDelete = (orderId: string) => {
    deleteOrder(orderId);
    setDeleteConfirmId(null);
    if (expandedOrderId === orderId) setExpandedOrderId(null);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Tab Header Banner */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-white flex items-center gap-2">
          💰 Orders Pipemanager
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Monitor your customer templates logs, check mobile wallet Transaction IDs, dispatch configurations, and track earnings metrics.
        </p>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Total Orders Metric */}
        <div className="bg-[#111] border border-[#222] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Total Orders received</p>
            <p className="text-3xl font-extrabold text-white mt-1.5">{orders.length}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <ShoppingBag size={20} />
          </div>
        </div>

        {/* Pending review Queue */}
        <div className="bg-[#111] border border-[#222] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Pending Reviews Queue</p>
            <p className="text-3xl font-extrabold text-yellow-500 mt-1.5">
              {orders.filter(o => o.status === 'Pending').length}
            </p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-yellow-500/10 text-yellow-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
        </div>

        {/* Completed Revenue widget */}
        <div className="bg-[#111] border border-[#222] p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-black">Completed Sales Revenue</p>
            <p className="text-3xl font-black text-emerald-400 mt-1.5">{formattedRevenue()}</p>
          </div>
          <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <TrendingUp size={20} />
          </div>
        </div>

      </div>

      {/* Main Filter, Search and Listing Container */}
      <div className="bg-[#111] border border-[#222] rounded-2xl overflow-hidden shadow-xl">
        
        {/* Controls Block */}
        <div className="p-5 border-b border-[#222] flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/40">
          
          {/* Custom Search Box */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-[#2d2d2d] rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none text-white placeholder-zinc-500 focus:border-[#00aaff] transition"
              placeholder="Search by ID, name, transaction..."
            />
          </div>

          {/* Custom Filters list */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {['All', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((item) => (
              <button
                key={item}
                onClick={() => setStatusFilter(item)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                  statusFilter === item 
                    ? 'bg-blue-600/15 text-[#00aaff] border-blue-500/40 font-bold' 
                    : 'bg-[#181818] text-zinc-400 border-transparent hover:border-zinc-800'
                }`}
              >
                {item} {item === 'All' ? `(${orders.length})` : `(${orders.filter(o => o.status === item).length})`}
              </button>
            ))}
          </div>

        </div>

        {/* Listing Log Table */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 px-4">
            <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <p className="text-zinc-400 text-sm font-semibold">No Orders Match the Criteria</p>
            <p className="text-zinc-500 text-xs mt-1">When users submit secure checkouts on templates, records populate here instantly.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222] text-zinc-500 text-[11px] uppercase tracking-wider bg-zinc-950/20">
                  <th className="p-4 font-extrabold">Order / Date</th>
                  <th className="p-4 font-extrabold">Client Contacts</th>
                  <th className="p-4 font-extrabold">Purchased Product</th>
                  <th className="p-4 font-extrabold">Method / Txn ID</th>
                  <th className="p-4 font-extrabold">Status Action</th>
                  <th className="p-4 font-extrabold text-right">Settings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#222]">
                {filteredOrders.map((order) => {
                  const isExpanded = expandedOrderId === order.id;
                  const isConfirmingDelete = deleteConfirmId === order.id;
                  const orderDate = new Date(order.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  });

                  return (
                    <React.Fragment key={order.id}>
                      
                      {/* Main Record Grid Row */}
                      <tr className={`hover:bg-zinc-900/40 transition group ${isExpanded ? 'bg-zinc-900/20' : ''}`}>
                        
                        {/* Reference / Date */}
                        <td className="p-4">
                          <button 
                            onClick={() => toggleExpand(order.id)}
                            className="font-mono text-xs font-black text-emerald-400 hover:underline flex items-center gap-1 text-left"
                          >
                            {order.id}
                            <Eye size={12} className="text-zinc-600 group-hover:text-emerald-400" />
                          </button>
                          <div className="text-zinc-500 text-[10px] flex items-center gap-1 mt-1 font-mono">
                            <Calendar size={10} />
                            {orderDate}
                          </div>
                        </td>

                        {/* Client Contacts */}
                        <td className="p-4">
                          <div className="font-semibold text-white text-sm max-w-[150px] truncate">{order.fullName}</div>
                          <div className="text-zinc-400 text-xs truncate max-w-[150px]">{order.phone}</div>
                        </td>

                        {/* Product Detail */}
                        <td className="p-4">
                          <div className="font-semibold text-zinc-200 text-sm truncate max-w-[180px]">{order.productName}</div>
                          <div className="text-zinc-500 text-[10px] uppercase font-mono tracking-wider mt-0.5">{order.productPrice}</div>
                        </td>

                        {/* Method / Txn ID */}
                        <td className="p-4">
                          <span className="text-xs font-bold text-zinc-300">{order.paymentMethod}</span>
                          <div className="font-mono text-zinc-400 text-xs font-semibold uppercase tracking-wider select-all mt-0.5 bg-zinc-950/60 w-fit px-1.5 py-0.5 rounded border border-zinc-850">
                            {order.transactionId}
                          </div>
                        </td>

                        {/* Status Select dropdown */}
                        <td className="p-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value as any)}
                            className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg border outline-none cursor-pointer tracking-wider ${getStatusBadge(order.status)}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>

                        {/* Actions drawer settings */}
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => toggleExpand(order.id)}
                              className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white rounded-lg transition"
                              title="Toggle details"
                            >
                              {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                            </button>

                            {isConfirmingDelete ? (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => handleDelete(order.id)}
                                  className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-[10px] font-bold uppercase tracking-wider"
                                  title="Confirm delete"
                                >
                                  Yes
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-2 py-1 bg-zinc-800 text-zinc-500 hover:text-zinc-300 rounded text-[10px] font-bold uppercase"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setDeleteConfirmId(order.id)}
                                className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/20 rounded-lg transition"
                                title="Delete record"
                              >
                                <Trash2 size={14} />
                              </button>
                            )}
                          </div>
                        </td>

                      </tr>

                      {/* Expanded Drawer row */}
                      {isExpanded && (
                        <tr>
                          <td colSpan={6} className="bg-zinc-950/30 p-5 border-b border-[#222]">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-zinc-300">
                              
                              {/* Left details section */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-black text-[#00aaff] uppercase tracking-widest border-b border-zinc-850 pb-2">
                                  📑 Full Specs Overview
                                </h4>
                                
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between py-1 border-b border-zinc-900/60">
                                    <span className="text-zinc-500">Buyer Name:</span>
                                    <span className="text-white font-medium">{order.fullName}</span>
                                  </div>
                                  <div className="flex justify-between py-1 border-b border-zinc-900/60">
                                    <span className="text-zinc-500">Contact Email:</span>
                                    <a href={`mailto:${order.email}`} className="text-[#00aaff] hover:underline flex items-center gap-1 font-medium">
                                      {order.email} <ExternalLink size={10} />
                                    </a>
                                  </div>
                                  <div className="flex justify-between py-1 border-b border-zinc-900/60">
                                    <span className="text-zinc-500">Phone Code:</span>
                                    <span className="text-white font-mono">{order.phone}</span>
                                  </div>
                                  {order.companyName && (
                                    <div className="flex justify-between py-1 border-b border-zinc-900/60">
                                      <span className="text-zinc-500">Company Name:</span>
                                      <span className="text-white">{order.companyName}</span>
                                    </div>
                                  )}
                                  {order.whatsappNumber && (
                                    <div className="flex justify-between py-1 border-b border-zinc-900/60">
                                      <span className="text-zinc-500">WhatsApp Number:</span>
                                      <span className="text-[#25D366] font-mono font-bold">{order.whatsappNumber}</span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Right details requirements section */}
                              <div className="space-y-4">
                                <h4 className="text-xs font-black text-emerald-400 uppercase tracking-widest border-b border-zinc-850 pb-2 flex items-center gap-1">
                                  <Sparkles size={11} /> Customer Requirements & Notes
                                </h4>

                                <div className="bg-[#151515] hover:bg-[#1a1a1a] border border-[#2d2d2d] p-4 rounded-xl text-xs text-zinc-300 leading-relaxed font-mono whitespace-pre-line overflow-y-auto max-h-48 custom-scrollbar">
                                  {order.additionalNotes ? order.additionalNotes : 'No additional deployment notes or custom specs submitted.'}
                                </div>

                                <div className="flex gap-2">
                                  <a 
                                    href={`https://wa.me/${order.phone.replace(/[^0-9]/g, '')}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-emerald-600 hover:bg-emerald-700 font-bold text-[11px] uppercase tracking-wider rounded-lg transition text-white"
                                  >
                                    <MessageSquare size={12} /> Contact Client (WA)
                                  </a>
                                  <a 
                                    href={`mailto:${order.email}`}
                                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 bg-zinc-800 hover:bg-zinc-750 font-semibold text-[11px] uppercase tracking-wider rounded-lg transition text-zinc-300"
                                  >
                                    <Mail size={12} /> Email Client
                                  </a>
                                </div>
                              </div>

                            </div>
                          </td>
                        </tr>
                      )}

                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

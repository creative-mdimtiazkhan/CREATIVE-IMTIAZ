import { useAppContext } from '../../context/AppContext';

export default function ClientReport() {
  const { state } = useAppContext();
  const messages = state.messages || [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 shadow-xl">
        <h2 className="text-2xl font-bold mb-6 text-white">Client Reports</h2>
        
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No messages yet. When clients submit the form, they will appear here.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] text-gray-400 text-sm">
                  <th className="p-4 font-medium whitespace-nowrap">Date</th>
                  <th className="p-4 font-medium whitespace-nowrap">Name</th>
                  <th className="p-4 font-medium whitespace-nowrap">Phone</th>
                  <th className="p-4 font-medium whitespace-nowrap">Email</th>
                  <th className="p-4 font-medium min-w-[300px]">Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#333]">
                {messages.map((msg) => (
                  <tr key={msg.id} className="hover:bg-[#1a1a1a] transition text-sm">
                    <td className="p-4 text-gray-400 whitespace-nowrap">{msg.date}</td>
                    <td className="p-4 text-white font-medium whitespace-nowrap">{msg.name}</td>
                    <td className="p-4 text-gray-300 whitespace-nowrap">{msg.phone}</td>
                    <td className="p-4 text-[#00aaff] whitespace-nowrap">
                      <a href={`mailto:${msg.email}`}>{msg.email}</a>
                    </td>
                    <td className="p-4 text-gray-300">
                      <div className="max-h-24 overflow-y-auto pr-2 custom-scrollbar">
                        {msg.message}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

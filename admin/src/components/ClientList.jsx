import React from 'react'

const ClientList = ({clients, onSelect, selectedId}) => {
  return (
 <div className="w-1/4 border-r border-white/10">
      {clients.map(client => (
        <div
          key={client.id}
          onClick={() => onSelect(client)}
          className={`p-4 cursor-pointer ${
            selectedId === client.id ? 'bg-purple-500/30' : ''
          }`}
        >
          <h3 className="font-semibold">{client.name}</h3>
          <p className="text-sm text-gray-400">{client.project}</p>
        </div>
      ))}
    </div>  )
}

export default ClientList
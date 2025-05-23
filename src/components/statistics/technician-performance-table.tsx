'use client';

interface TechnicianPerformanceTableProps {
  data: {
    nome: string;
    atribuidos: number;
    resolvidos: number;
    taxa: string;
    avgHours: number;
    classificacao: string;
  }[];
}

export default function TechnicianPerformanceTable({ data }: TechnicianPerformanceTableProps) {
  // Ordenar os técnicos pela taxa de resolução (decrescente)
  const sortedData = [...data].sort((a, b) => {
    // Converter taxas de percentual (ex: "88%") para número
    const rateA = parseInt(a.taxa.replace('%', ''), 10) || 0;
    const rateB = parseInt(b.taxa.replace('%', ''), 10) || 0;
    return rateB - rateA;
  });
  
  // Função para determinar classe de cor com base na eficiência
  function getEfficiencyClass(efficiency: string): string {
    switch (efficiency) {
      case 'Excelente': return 'bg-green-100 text-green-800';
      case 'Bom': return 'bg-blue-100 text-blue-800';
      case 'Regular': return 'bg-yellow-100 text-yellow-800';
      case 'Precisa Melhorar': return 'bg-red-100 text-red-800';
      case 'Sem Avaliação': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="px-4 py-2 border-b">Técnico</th>
            <th className="px-4 py-2 border-b text-center">Chamados Atribuídos</th>
            <th className="px-4 py-2 border-b text-center">Chamados Resolvidos</th>
            <th className="px-4 py-2 border-b text-center">Taxa de Resolução</th>
            <th className="px-4 py-2 border-b text-center">Tempo Médio (horas)</th>
            <th className="px-4 py-2 border-b text-center">Classificação</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((tech, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
              <td className="px-4 py-3 border-b font-medium">{tech.nome}</td>
              <td className="px-4 py-3 border-b text-center">{tech.atribuidos}</td>
              <td className="px-4 py-3 border-b text-center">{tech.resolvidos}</td>
              <td className="px-4 py-3 border-b text-center">{tech.taxa}</td>
              <td className="px-4 py-3 border-b text-center">{tech.avgHours.toFixed(1)}</td>
              <td className="px-4 py-3 border-b text-center">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyClass(tech.classificacao)}`}>
                  {tech.classificacao}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
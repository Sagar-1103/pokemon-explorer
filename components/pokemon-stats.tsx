"use client"

interface PokemonStatsProps {
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
}

export default function PokemonStats({ stats }: PokemonStatsProps) {
  return (
    <div className="space-y-4">
      {stats?.map((stat) => (
        <div key={stat.stat.name}>
          <div className="flex justify-between mb-1">
            <span className="text-sm capitalize">{stat.stat.name}</span>
            <span className="text-sm">{stat.base_stat}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}


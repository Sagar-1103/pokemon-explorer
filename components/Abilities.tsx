import React from 'react'

export default function Abilities({typeGradient,abilities}:any) {
  return (
    <div className="bg-gradient-to-r w-[90%] md:w-full from-gray-100 to-gray-200 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="mr-2">Abilities</span>
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${typeGradient}`}></div>
              </h2>
              <div className="space-y-3">
                {abilities?.map(
                  (ability: { ability: { name: string }; is_hidden: boolean }) => (
                    <div
                      key={ability.ability.name}
                      className={`bg-white p-4 rounded-lg shadow-sm group hover:shadow-md transition duration-200`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700 font-semibold text-lg capitalize  group-hover:text-gray-900">
                          {ability.ability.name.replace("-", " ")}
                        </span>
                        {ability.is_hidden && (
                          <span className="bg-gray-200 font-medium text-gray-600 text-xs px-2 py-1 rounded-full">
                            Hidden
                          </span>
                        )}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
  )
}

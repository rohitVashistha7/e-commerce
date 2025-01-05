"use client"

import { useState } from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

export function FilterSidebar() {
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])

  const brands = ['Nike', 'Adidas', 'Puma', 'Reebok']
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const handleSizeChange = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    )
  }

  return (
    <aside className="w-64 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <Slider
          min={0}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div className="flex justify-between mt-2">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Brands</h3>
        {brands.map(brand => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={brand}
              checked={selectedBrands.includes(brand)}
              onCheckedChange={() => handleBrandChange(brand)}
            />
            <label htmlFor={brand}>{brand}</label>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sizes</h3>
        {sizes.map(size => (
          <div key={size} className="flex items-center space-x-2">
            <Checkbox
              id={size}
              checked={selectedSizes.includes(size)}
              onCheckedChange={() => handleSizeChange(size)}
            />
            <label htmlFor={size}>{size}</label>
          </div>
        ))}
      </div>
    </aside>
  )
}


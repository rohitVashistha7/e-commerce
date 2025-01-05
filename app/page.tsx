import { ProductGrid } from '@/components/product-grid'
import { SearchBar } from '@/components/search-bar'
import { FilterSidebar } from '@/components/filter-sidebar'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to FashionHub</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <FilterSidebar />
        <div className="flex-1">
          <SearchBar />
          <ProductGrid />
        </div>
      </div>
    </main>
  )
}


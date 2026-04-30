export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  color: string
  created_at: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  color: string
  created_at: string
}

export interface Addon {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  image_url: string | null
  download_url: string
  version: string
  minecraft_version: string | null
  downloads: number
  is_featured: boolean
  is_published: boolean
  category_id: string | null
  author: string
  created_at: string
  updated_at: string
  category?: Category
  tags?: Tag[]
}

export interface AddonTag {
  addon_id: string
  tag_id: string
}

export interface Admin {
  id: string
  email: string
  created_at: string
}

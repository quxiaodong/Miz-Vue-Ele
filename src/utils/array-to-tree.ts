interface TreeNode {
  id: string
  sort?: number | null
  parentId?: string | null
  children?: TreeNode[]
}

export function buildTree<T extends TreeNode>(array: T[]): T[] {
  const sortedArray = [...array].sort(
    (a, b) => (a.sort || Infinity) - (b.sort || Infinity)
  )

  const map = new Map<string, T>()
  const roots: T[] = []

  sortedArray.forEach(item => map.set(item.id, { ...item }))

  sortedArray.forEach(item => {
    const node = map.get(item.id)!
    if (item.parentId) {
      const parent = map.get(item.parentId)
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(node)
      } else {
        roots.push(node)
      }
    } else {
      roots.push(node)
    }
  })

  return roots
}

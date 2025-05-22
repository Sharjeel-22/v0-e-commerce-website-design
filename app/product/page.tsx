import { redirect } from "next/navigation"

export default function ProductPage() {
  // Redirect to home if someone visits /product directly
  redirect("/")
}

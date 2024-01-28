"use client";
import { Badge } from "@/components/ui/badge"
import Navbar from "./navbar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
]

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
]

export default function Home() {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <main className="flex min-h-screen flex-col p-12">
      <nav className="w-full max-x-[1200px] flex justify-between mb-12">
        <div>
         <div className="relative z-20 flex items-center text-lg font-medium">
          <svg className="mr-2" width="24" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5265 0.000784679C5.98416 0.0693812 1.50731 4.5886 1.50731 10.1471V22.7638C0.595941 23.3989 0 24.4547 0 25.6507C0 27.5939 1.57301 29.1669 3.51617 29.1669C5.45929 29.1669 7.03233 27.5939 7.03233 25.6507C7.03233 24.4728 6.45429 23.4309 5.56616 22.7929V10.1471C5.56616 6.77826 8.28557 4.05884 11.6544 4.05884H13.8529C17.2218 4.05884 19.9412 6.77826 19.9412 10.1471C19.9412 13.5159 17.2218 16.2353 13.8529 16.2353H13.6726C13.0325 15.3681 12.0032 14.806 10.8416 14.806C8.8985 14.806 7.32546 16.379 7.32546 18.3222C7.32546 20.2653 8.8985 21.8383 10.8416 21.8383C12.0537 21.8383 13.1218 21.2263 13.7539 20.2942H13.8529C19.4541 20.2942 24 15.7483 24 10.1471C24 4.5459 19.4541 0 13.8529 0H11.5265V0.000784679Z" fill="black"/>
          </svg> Pocketup
          </div>
        </div>
          <Avatar>
            <AvatarImage src="https://media1.tenor.com/m/IAR8RQwY3UoAAAAC/vomit-gnome.gif" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </nav>

      <div className="w-full">
          <div className="w-full flex justify-between">
          <div className="flex mb-4">
            <Link className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary bg-muted font-medium text-primary" href="#">
              Main
            </Link>
            <Link className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground" href="#">
              Dashboard
            </Link>
            <Link className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground" href="#">
              Items
            </Link>
            <Link className="flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary font-medium text-muted-foreground" href="#">
              Settings
            </Link>
          </div>
          <Button>Create</Button>
          </div>
      <div className="rounded-md border">
        
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Page {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length}
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>

    </main>

  );
}

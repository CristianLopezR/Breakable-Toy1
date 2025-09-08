import { getCoreRowModel, useReactTable, flexRender,getPaginationRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";

interface ReactTableProps<T extends object>{
    data: T[];
    columns:ColumnDef<T>[];
    showNavigation?: boolean;
    showForm?: boolean;
    formComponent?: React.ReactNode;

}

export const Table = <T extends object>({data,columns,showForm,formComponent}:ReactTableProps<T>)=>{
    const table=useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return(
<<<<<<< HEAD
        <div >
            <table style={{width: "90%"}}>
=======
        <div className="overflow-hidden p-2">
            <table className="min-w-full text-center">
>>>>>>> Raw-Product
                <thead className="border-b bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
<<<<<<< HEAD
                <tbody style={{minWidth: "3000px",padding: "8px",textAlign: "left"}}>
=======
                <tbody>
>>>>>>> Raw-Product
                    {showForm && (
                        <tr>
                            <td colSpan={columns.length}>
                                {formComponent}
                            </td>
                        </tr>
                    )}
                    {table.getRowModel().rows.map((row) => (
<<<<<<< HEAD
                        <tr key={row.id} className='border' style={{minWidth: "3000px",padding: "8px",textAlign: "left"}}>
                            {row.getVisibleCells().map((cell) => (
                                <td className="whitespace" key={cell.id}>
=======
                        <tr key={row.id} className='border-b bg-white'>
                            {row.getVisibleCells().map((cell) => (
                                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
>>>>>>> Raw-Product
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
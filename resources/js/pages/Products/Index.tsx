import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';




const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

interface  Product{
    id: number,
    name: string,
    price: number,
    description: string,
}



interface PageProps {
    flash: {
        message?: string
    },
    products: Product[];
}



export default function Index() {
    const { products, flash } = usePage().props as PageProps;

    const { processing, delete: destroy } = useForm();
    const handleDelete = (id: number, name: string) => {
        if (confirm("Do you want to delete a product" + " " + id + " " + name)) {
            destroy(`/products/${id}`)
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={"products/create"}><Button>Create Product</Button></Link>
            </div>
            <div className='m-4'>
                {flash.message && (
                    <Alert>

                        <AlertTitle>Notificaction!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>

            {products.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent invoices.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>NAME</TableHead>
                                <TableHead>PRICE</TableHead>
                                <TableHead>DESCRIPTION</TableHead>
                                <TableHead className="text-center">ACTION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-medium">{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>${product.price}</TableCell>
                                    <TableCell>{product.description}</TableCell>
                                    <TableCell className="text-center">
                                        <Link href={`/products/${product.id}/edit`}><Button className='mr-2'>Edit</Button></Link>
                                        <Button className='text-white bg-red-500 hover:bg-red-900'
                                           disabled={processing} onClick={() => handleDelete(product.id, product.name)}>Delete</Button>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </AppLayout>
    );
}

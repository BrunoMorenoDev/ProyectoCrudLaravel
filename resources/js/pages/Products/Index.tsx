import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';



const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];
interface PageProps{
    flash:{
        message?: string
    }
}
export default function Index() {
    const {flash}=usePage().props as PageProps;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className='m-4'>
                <Link href={"products/create"}><Button>Create Product</Button></Link>
            </div>
            <div className='m-4'>
                {flash.message&&(
                    <Alert>
                           
                            <AlertTitle>Notificaction!</AlertTitle>
                            <AlertDescription>
                                {flash.message}
                            </AlertDescription>
                        </Alert>
                )}
            </div>
        </AppLayout>
    );
}

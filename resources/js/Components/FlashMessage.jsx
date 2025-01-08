import { usePage } from '@inertiajs/react';

const FlashMessage = () => {
    const { flash } = usePage().props;

    return (
        <>
            {flash.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative mb-4" role="alert">
                    {flash.success}
                </div>
            )}
            {flash.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4" role="alert">
                    {flash.error}
                </div>
            )}
        </>
    );
};

export default FlashMessage;

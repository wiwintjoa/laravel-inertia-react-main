import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function EditForm({ company, onClose }) {
    const [searching, setSearching] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    const { data, setData, put, processing, errors, reset } = useForm({
        name: company.name || '',
        email: company.email || '',
        phone: company.phone || '',
        postcode: company.postcode || '',
        prefecture: company.prefecture || '',
        city: company.city || '',
        local: company.local || '',
        image: null,
        street_address: company.street_address || '',
        business_hour: company.business_hour || '',
        regular_holiday: company.regular_holiday || '',
        fax: company.fax || '',
        url: company.url || '',
        license_number: company.license_number || ''
    });


    useEffect(() => {
        return () => {
        reset('image');
        };
    }, []);

    const handleSearch = async () => {
        setSearching(true);

        try {
        const response = await fetch('/postcode-lookup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content,
            },
            body: JSON.stringify({ postcode: data.postcode }),
        });

        const result = await response.json();
        console.log(result);
        if (response.ok) {
             setData({
                ...data,
                prefecture: result.prefecture,
                city: result.city,
                local: result.local,
            });
        } else {
            console.error('Lookup failed:', result.message);
        }
        } catch (error) {
        console.error('Error during fetch:', error);
        } finally {
        setSearching(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        setPreviewUrl(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('companies.update', company.id), {
        onSuccess: () => {
                if (onClose) onClose();
            },
        });
    };

    return (
        <div className='max-w-xl'>
            <div className='surface-card p-6 sm:p-4 shadow-2 border-round w-full'>
            <div className='text-center mb-5'>
                <div className='text-900 text-3xl font-medium mb-3'>Edit Company</div>
            </div>
            <form onSubmit={submit}>
                <div className='mb-3'>
                <label htmlFor='name' className='block text-900 font-medium mb-2'>Name</label>
                <InputText
                    id="name"
                    type="text"
                    placeholder="Company Name"
                    className="w-full"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                <InputError message={errors.name}/>
                </div>

                <div className='mb-3'>
                <label htmlFor='email' className='block text-900 font-medium mb-2'>Email</label>
                <InputText
                    id="email"
                    type="email"
                    placeholder="email"
                    className="w-full"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.email}/>
                </div>

                <div className='mb-3 flex gap-2 align-items-end'>
                <div className="flex-grow-1">
                    <label htmlFor="postcode" className="block text-900 font-medium mb-2">Postcode</label>
                    <InputText
                    id="postcode"
                    type="text"
                    placeholder="e.g. 9800014"
                    className="w-full"
                    value={data.postcode}
                    onChange={(e) => setData('postcode', e.target.value)}
                    />
                    <InputError message={errors.postcode} />
                </div>
                <PrimaryButton label="Search" onClick={handleSearch} disabled={searching} />
                </div>

                <div className="mb-3">
                    <label htmlFor="prefecture" className="block text-900 font-medium mb-2">Prefecture</label>
                    <InputText
                        id="prefecture"
                        type="text"
                        className="w-full"
                        value={data.prefecture}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="city" className="block text-900 font-medium mb-2">City</label>
                    <InputText
                        id="city"
                        type="text"
                        className="w-full"
                        value={data.city}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="local" className="block text-900 font-medium mb-2">Local</label>
                    <InputText
                        id="local"
                        type="text"
                        className="w-full"
                        value={data.local}
                        readOnly
                    />
                </div>

                <div className='mb-3'>
                    <label htmlFor='street_address' className='block text-900 font-medium mb-2'>Street Address</label>
                    <InputText
                        id="street_address"
                        type="text"
                        placeholder="Street Address"
                        className="w-full"
                        value={data.street_address}
                        onChange={(e) => setData('street_address', e.target.value)}
                    />
                    <InputError message={errors.street_address}/>
                </div>

                <div className='mb-3'>
                    <label htmlFor='business_hour' className='block text-900 font-medium mb-2'>Business Hour</label>
                    <InputText
                        id="business_hour"
                        type="text"
                        placeholder="Business Hour"
                        className="w-full"
                        value={data.business_hour}
                        onChange={(e) => setData('business_hour', e.target.value)}
                    />
                    <InputError message={errors.business_hour}/>
                </div> 

                <div className='mb-3'>
                    <label htmlFor='regular_holiday' className='block text-900 font-medium mb-2'>Regular Holiday</label>
                    <InputText
                        id="regular_holiday"
                        type="text"
                        placeholder="Regular Holiday"
                        className="w-full"
                        value={data.regular_holiday}
                        onChange={(e) => setData('regular_holiday', e.target.value)}
                    />
                    <InputError message={errors.regular_holiday}/>
                </div>   

                <div className='mb-3'>
                    <label htmlFor='fax' className='block text-900 font-medium mb-2'>Fax</label>
                    <InputText
                        id="fax"
                        type="text"
                        placeholder="Fax"
                        className="w-full"
                        value={data.fax}
                        onChange={(e) => setData('fax', e.target.value)}
                    />
                    <InputError message={errors.fax}/>
                </div>   

                <div className='mb-3'>
                    <label htmlFor='phone' className='block text-900 font-medium mb-2'>Phone</label>
                    <InputText
                        id="phone"
                        type="text"
                        placeholder="phone"
                        className="w-full"
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    <InputError message={errors.phone}/>
                </div>              

                <div className='mb-3'>
                    <label htmlFor='license_number' className='block text-900 font-medium mb-2'>License Number</label>
                    <InputText
                        id="license_number"
                        type="text"
                        placeholder="License Number"
                        className="w-full"
                        value={data.license_number}
                        onChange={(e) => setData('license_number', e.target.value)}
                    />
                    <InputError message={errors.license_number}/>
                </div> 

                <div className='mb-3'>
                    <label htmlFor='url' className='block text-900 font-medium mb-2'>URL</label>
                    <InputText
                        id="url"
                        type="text"
                        placeholder="http://company.com"
                        className="w-full"
                        value={data.url}
                        onChange={(e) => setData('url', e.target.value)}
                    />
                    <InputError message={errors.url}/>
                </div>                                       

                <div className="mb-3">
                    <label htmlFor="Image" className="block text-900 font-medium mb-2">Company Logo</label>
                    <input 
                        type="file"
                        accept="image/*"
                        className="w-full"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setData('image', file);
                            setPreviewUrl(URL.createObjectURL(file)); // Generate preview
                        }}
                    />
                    <InputError message={errors.image}/>
                </div>

                {previewUrl ? (
                    <div className="mb-3">
                        <img src={previewUrl} alt="New Preview" className="max-w-full h-auto border-round shadow-1" />
                    </div>
                    ) : company.image && (
                    <div className="mb-3">
                        <img src={`/storage/${company.image}`} alt="Current Logo" className="max-w-full h-auto border-round shadow-1" />
                    </div>
                )}

                <div className="flex justify-content-between mt-4 gap-2">
                <PrimaryButton label="Save Company" className="w-full" disabled={processing} type="submit" />

                <PrimaryButton
                    label="Close"
                    className="w-full"
                    severity="secondary"
                    type="button"
                    onClick={() => {
                    if (onClose) onClose();
                    }}
                />
                </div>

            </form>
            </div>
        </div>
    )

}
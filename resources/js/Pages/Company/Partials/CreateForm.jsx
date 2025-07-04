import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { InputText } from 'primereact/inputtext';
import React, { useEffect, useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function CreateForm({ onClose, prefectures = [] }) {
  const [searching, setSearching] = useState(false);
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    phone: '',
    postcode: '',
    prefecture_id: '',
    prefecture: '',
    city: '',
    local: '',
    image: null,
    street_address: '',
    business_hour: '',
    regular_holiday: '',
    fax: '',
    url: '',
    license_number: ''
  });

  useEffect(() => {
    return () => {
      reset('image');
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
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

      const matchedPref = prefectures.find((p) => p.name === result.prefecture || p.display_name === result.prefecture);
      console.log('matchedPref');
      console.log(matchedPref);
      const prefectureId = matchedPref ? matchedPref.id : '';

      if (response.ok) {
        setData({
          ...data,
          prefecture: result.prefecture,
          city: result.city,
          local: result.local,
          prefecture_id: prefectureId,
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

  const submit = (e) => {
    e.preventDefault();
    post(route('companies.store'), {
      forceFormData: true,
      onSuccess: () => {
        if (onClose) onClose(); // Close the form after successful submission
      },
    });
  };


  return (
    <div className='max-w-xl'>
        <div className='surface-card p-6 sm:p-4 shadow-2 border-round w-full'>
          <div className='text-center mb-5'>
            <div className='text-900 text-3xl font-medium mb-3'>Create Company</div>
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
              <PrimaryButton label="Search" onClick={(e) => handleSearch(e)} disabled={searching} />
            </div>

            <input
              type="hidden"
              name="prefecture_id"
              value={data.prefecture_id}
            />

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
                placeholder="license_number"
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
                onChange={(e) => setData('image', e.target.files[0])}
              />
              <InputError message={errors.image}/>
            </div>

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

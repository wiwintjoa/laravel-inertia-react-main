import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import DataTable from 'react-data-table-component';
import PrimaryButton from '@/Components/PrimaryButton';
import {InputText} from "primereact/inputtext";

const SearchForm = ({ handleEditClick }) => {
  const page = usePage(); // Get full page object

  const companies = page.props.companies || [];
  const filters = page.props.filters || {};

  const [search, setSearch] = useState(filters.search || '');

  const handleFilter = (e) => {
    e.preventDefault();
    router.get(route('companies.index'), {
      search
    }, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleDelete = async (id) => {
    router.delete(`/companies/${id}`, {
      onSuccess: () => router.reload({ preserveState: true }),
    });
  };

  const columns = [
    { name: 'Name', selector: row => row.name, sortable: true },
    { name: 'Email', selector: row => row.email },
    { name: 'Phone', selector: row => row.phone },
    { name: 'Postcode', selector: row => row.postcode },
    { name: 'City', selector: row => row.city },
    { name: 'Prefecture', selector: row => row.prefecture?.name || '-' },
    { name: 'Local', selector: row => row.local },
    { name: 'Street Address', selector: row => row.street_address },
    { name: 'Business Hour', selector: row => row.business_hour },
    { name: 'Regular Holiday', selector: row => row.regular_holiday },

    {
      name: 'Actions',
      cell: row => (
        <>
           <button onClick={() => handleEditClick(row)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </>
      ),
    },
  ];

  return (
      <div className='max-w-xl'>
          <header>
              <h2 className="text-lg font-medium">Company Information</h2>

              <p className="mt-1 text-sm text-gray-600">
                  Search company profile based on search criteria.
              </p>
          </header>

          <div className='col-sm-12 mt-2'>
              <div className="card">
                <form onSubmit={handleFilter} className="formgrid grid mb-4">
                  <div className="field col-12 md:col-4">
                    <label htmlFor="search">Search Name</label>
                    <InputText
                      id="search"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search name, city ..."
                    />
                  </div>

                  <div className="col-12 text-left mt-2">
                    <PrimaryButton label="Apply Filters" icon="pi pi-filter" severity="primary" type="submit" />
                  </div>
                </form>

                <div className='card'>
                  <DataTable
                      columns={columns}
                      data={companies.data}
                      pagination
                      paginationServer
                      paginationTotalRows={companies.total}
                      paginationPerPage={companies.per_page}
                      paginationDefaultPage={companies.current_page}
                      highlightOnHover
                      dense
                  />
                </div>
              </div>

              {/* <div className='col-sm-12'>
                <div className="mb-4 text-left">
                    <PrimaryButton label="Create Company" icon="pi pi-plus" severity="success" onClick={() => router.get(route('companies.create'))} />
                </div>   

                <div className="card">
                    
                </div>
              </div>         */}
          </div>

          
      </div>
  );
};

export default SearchForm;
import React, { useState, useMemo, useEffect } from "react";
import { usePage, router } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import SecondaryButton from "@/Components/SecondaryButton";
import DangerButton from "@/Components/DangerButton";
import FilterComponent from "./FilterComponent";
import { Dialog } from 'primereact/dialog';

const SearchForm = ({ handleEditClick }) => {
    const page = usePage(); // Get full page object

    const companies = page.props.companies || [];

    const [pending, setPending] = useState(true);
    const [confirmingDeletion, setConfirmingDeletion] = useState(false);
    const [rows, setRows] = useState([]);

    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const filters = companies.data.filter(
        (item) => item.name?.toLowerCase().includes(filterText.toLowerCase())
    );
    const [companyToDelete, setCompanyToDelete] = useState(null);

    const [pagination, setPagination] = useState({
        page: companies.current_page,
        perPage: companies.per_page,
    });

    const handlePageChange = (page, totalRows) => {
        router.get(
            route('companies'),
            { page, perPage: pagination.perPage, q: filterText },
            { preserveScroll: true }
        );
    };

    const handlePerRowsChange = (newPerPage, page) => {
        router.get(
            route('companies'),
            { page, perPage: newPerPage, q: filterText },
            { preserveScroll: true }
        );
    };


    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText("");
            }
        };
        return (
            <FilterComponent
                onFilter={(e) => setFilterText(e.target.value)}
                onClear={handleClear}
                filterText={filterText}
            />
        );
    }, [filterText, resetPaginationToggle]);

    const DialogHeaderContent = (
        <h2 className="text-lg font-medium text-gray-900 pl-4 pt-2 mb-0">
            Are you sure you want to delete this record?
        </h2>
    );

    const handleDeleteClick = (id) => {
        setCompanyToDelete(id);         // store ID to use later
        setConfirmingDeletion(true);    // open the dialog
    };


   const deleteCompany = (e) => {
        e.preventDefault();

        if (!companyToDelete) return;

        router.delete(route("companies.destroy", companyToDelete), {
            onSuccess: () => {
            closeModal();
            },
        });
    };


    const closeModal = () => {
        setConfirmingDeletion(false);
        setCompanyToDelete(null); 
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRows(filters);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Postcode",
            selector: (row) => row.postcode,
        },
        {
            name: "Actions",
            cell: (row) => (
              <div className="flex gap-2">
                  <SecondaryButton
                    icon="pi pi-pencil"
                    severity="warning"
                    title="Edit company"
                    onClick={() => handleEditClick(row)} // `row` is company data
                  />
                  <DangerButton
                    icon="pi pi-trash"
                    severity="danger"
                    title="Delete company"
                    onClick={() => handleDeleteClick(row.id)}
                  />
              </div>
            ),
            ignoreRowClick: true, // Prevent row click from interfering
            allowOverflow: true, // Ensure button is visible if column is narrow
            button: true, // Indicates it's a button column
        },
    ];

    return (
        <div className="max-w-xl">
            <header>
                <h2 className="text-lg font-medium">Company Information</h2>

                <p className="mt-1 mb-3 text-sm text-gray-600">
                    Search company profile based on search criteria.
                </p>
            </header>

            <div className="card">
                <DataTable
                    columns={columns}
                    data={filters}
                    progressPending={pending}
                    pagination
                    paginationServer
                    paginationTotalRows={companies.total}
                    paginationPerPage={companies.per_page}
                    paginationDefaultPage={companies.current_page}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                    persistTableHead 
                    highlightOnHover
                    dense
                />
            </div>


            <Dialog className="px-6" header={DialogHeaderContent} visible={confirmingDeletion} style={{ width: '50vw' }}  onHide={() => setConfirmingDeletion(false)}>
                <form onSubmit={deleteCompany} className="px-4">
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ml-3">
                            Delete
                        </DangerButton>
                    </div>
                </form>
            </Dialog>

        </div>
    );
};

export default SearchForm;

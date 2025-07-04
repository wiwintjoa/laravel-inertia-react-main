<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

use App\Models\Company;
use App\Models\Prefecture;
use Inertia\Inertia;

class CompanyController extends Controller
{
    private const MAX_STRING_LENGTH = 255;

    /**
     * Display a listing of the companies.
     */
    public function index(Request $request)
    {
       $query = Company::with('prefecture');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                ->orWhere('city', 'like', '%' . $request->search . '%');
            });
        }

        $prefectures = Cache::remember('prefecture_list', 3600, function () {
            return Prefecture::select('id', 'name', 'display_name')->get();
        });

        $companies = $query->paginate(10)->withQueryString();

        return Inertia::render('Company/Index', [
            'companies' => $companies,
            'filters' => $request->only(['search']),
            'prefectures' => $prefectures,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Company/CreateForm');
    }

    /**
     * Store a newly created company in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email',
            'postcode' => 'required|string|size:7',
            'street_address' => 'max:' . self::MAX_STRING_LENGTH,
            'business_hour' => 'max:' . self::MAX_STRING_LENGTH,
            'regular_holiday' => 'max:' . self::MAX_STRING_LENGTH,
            'phone' => 'numeric',
            'fax' => 'string|max:50',
            'url' => 'max:' . self::MAX_STRING_LENGTH,
            'license_number' => 'string|max:50',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048', // 2MB limit
        ]);

        Company::create($request->all());

        return redirect()->route('companies.index');
    }

    /**
     * Display the specified company.
     */
    public function show(string $id)
    {
        //
        $company = Company::findOrFail($id);

        return Inertia::render('Company/EditForm', ['company' => $company]);
    }

    /**
     * Show the form for editing the specified company.
     */
    public function edit(string $id)
    {
        //
        $company = Company::findOrFail($id);

        return Inertia::render('Company/EditForm', [
            'company' => $company
        ]);
    }

    /**
     * Update the specified company in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email',
            'postcode' => 'required|string|size:7',
            'street_address' => 'max:' . self::MAX_STRING_LENGTH,
            'business_hour' => 'max:' . self::MAX_STRING_LENGTH,
            'regular_holiday' => 'max:' . self::MAX_STRING_LENGTH,
            'phone' => 'numeric',
            'fax' => 'string|max:50',
            'url' => 'max:' . self::MAX_STRING_LENGTH,
            'license_number' => 'string|max:50',
            'image' => 'sometimes|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $company = Company::findOrFail($id);
        $company->update($request->all());

        return redirect()->route('companies.index');
    }

    /**
     * Remove the specified company from storage.
     */
    public function destroy(string $id)
    {
        //
        $company = Company::findOrFail($id);
        $company->delete();

        return redirect()->route('companies.index');
    }
}

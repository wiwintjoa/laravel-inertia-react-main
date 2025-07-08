<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Storage;

use App\Models\Company;
use App\Models\Prefecture;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Display a listing of the companies.
     */
    public function index(Request $request)
    {
       $query = Company::with('prefecture');

        $prefectures = Cache::remember('prefecture_list', 3600, function () {
            return Prefecture::select('id', 'display_name')->get();
        });

        $companies = $query->paginate(10)->withQueryString()->through(function ($company) {
            return [
                'id' => $company->id,
                'name' => $company->name,
                'email' => $company->email,
                'phone' => $company->phone,
                'postcode' => $company->postcode,
                'prefecture_id' => $company->prefecture_id,
                'prefecture' => $company->prefecture,
                'city' => $company->city,
                'local' => $company->local,
                'street_address' => $company->street_address,
                'business_hour' => $company->business_hour,
                'regular_holiday' => $company->regular_holiday,
                'fax' => $company->fax,
                'url' => $company->url,
                'license_number' => $company->license_number,
                'image' => $company->image,
                'image_url' => $company->image
                        ? asset('storage/' . $company->image)
                        : null,
            ];
        });

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
        $validated = $request->validate([
            'name' => 'required|string|max:50',
            'email' => 'required|email',
            'postcode' => 'required|string|max:7|min:7',
            'prefecture' => 'required|string',
            'prefecture_id' => 'required|exists:prefectures,id',
            'city' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'street_address' => 'nullable|string|max:255',
            'business_hour' => 'nullable|string|max:255',
            'regular_holiday' => 'nullable|string|max:255',
            'phone' => 'numeric',
            'fax' => 'nullable|string|max:50',
            'url' => 'nullable|url|max:255',
            'license_number' => 'nullable|string|max:50',
            'image' => 'required|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Store uploaded image if provided
        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('logos', 'public');
            // Stored path will be like: logos/company123.jpg
        }

        Company::create($validated);

        return redirect()->route('companies')
            ->with('success', 'Company created successfully!');
    }

    /**
     * Show the form for editing the specified company.
     */
    public function edit(string $id)
    {
        //
        $company = Company::findOrFail($id);

        return Inertia::render('Company/EditForm', [
            'company' => [
                'id' => $company->id,
                'name' => $company->name,
                'email' => $company->email,
                'phone' => $company->phone,
                'postcode' => $company->postcode,
                'prefecture_id' => $company->prefecture_id,
                'prefecture' => $company->prefecture,
                'city' => $company->city,
                'local' => $company->local,
                'street_address' => $company->street_address,
                'business_hour' => $company->business_hour,
                'regular_holiday' => $company->regular_holiday,
                'fax' => $company->fax,
                'url' => $company->url,
                'license_number' => $company->license_number,
                'image' => $company->image,
                'image_url' => $company->image ? asset('storage/' . $company->image) : null,
            ]
        ]);
    }

    /**
     * Update the specified company in storage.
     */
    public function update(Request $request, string $id)
    {
        $company = Company::findOrFail($id);

        // Validate all fields first
        $validated = $request->validate([
           'name' => 'required|string|max:50',
            'email' => 'required|email',
            'postcode' => 'required|string|max:7|min:7',
            'prefecture' => 'required|string',
            'prefecture_id' => 'required|exists:prefectures,id',
            'city' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'street_address' => 'nullable|string|max:255',
            'business_hour' => 'nullable|string|max:255',
            'regular_holiday' => 'nullable|string|max:255',
            'phone' => 'numeric',
            'fax' => 'nullable|string|max:50',
            'url' => 'nullable|url|max:255',
            'license_number' => 'nullable|string|max:50',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle image update
        if ($request->hasFile('image')) {
            if ($company->image && Storage::disk('public')->exists($company->image)) {
                Storage::disk('public')->delete($company->image);
            }
            $validated['image'] = $request->file('image')->store('logos', 'public');
        } else {
            // Preserve existing image if no file uploaded
            $validated['image'] = $company->image;
        }

        // Handle fallback for prefecture_id
        if (empty($validated['prefecture_id'])) {
            $validated['prefecture_id'] = $company->prefecture_id;
        }

        $company->update($validated);

        return redirect()->route('companies') // <- route fix if needed
            ->with('success', 'Company updated successfully!');
    }

    /**
     * Remove the specified company from storage.
     */
    public function destroy(string $id)
    {
        //
        $company = Company::findOrFail($id);

        if ($company->image && Storage::disk('public')->exists($company->image)) {
            Storage::disk('public')->delete($company->image);
        }

        $company->delete();

        return redirect()->route('companies')
            ->with('success', 'Company deleted successfully.');
    }
}

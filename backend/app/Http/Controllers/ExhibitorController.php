<?php

namespace App\Http\Controllers;

use App\Models\Exhibitor;
use Illuminate\Http\Request;

class ExhibitorController extends Controller
{
    public function index(Request $request)
    {
        $query = Exhibitor::query();

        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = $request->search;
            $query->where(function($q) use ($searchTerm) {
                $q->where('name', 'LIKE', '%' . $searchTerm . '%')
                  ->orWhere('country', 'LIKE', '%' . $searchTerm . '%')
                  ->orWhere('category', 'LIKE', '%' . $searchTerm . '%');
            });
        }

        if ($request->has('sort') && !empty($request->sort)) {
            $sortBy = $request->sort;
            $query->orderBy($sortBy);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'country' => 'required|string|max:100',
                'category' => 'required|string|max:100',
                'website' => 'nullable|url|max:255',
            ]);

            $exhibitor = Exhibitor::create($validated);

            return response()->json([
                'success' => true,
                'data' => $exhibitor,
                'message' => 'Exhibitor created successfully'
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Exhibitor $exhibitor)
    {
        return response()->json($exhibitor);
    }

    public function update(Request $request, $id)
    {
        $exhibitor = Exhibitor::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'country' => 'required|string|max:100',
            'category' => 'required|string|max:100',
            'website' => 'nullable|url|max:255',
        ]);

        $exhibitor->update($request->all());

        return response()->json($exhibitor);
    }

    public function destroy($id)
    {
        $exhibitor = Exhibitor::findOrFail($id);
        $exhibitor->delete();

        return response()->json(['message' => 'Exhibitor deleted successfully']);
    }
}

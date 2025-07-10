<?php
/**  Post code controller to maintain post code request
 *   Created by Wiwin
 *   07-Jul-2025
*/

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PostCode;
use Inertia\Inertia;

class PostCodeController extends Controller
{
    public function lookup(Request $request)
    {
        $request->validate([
            'postcode' => 'required|size:7',
        ]);

        $postcode = $request->input('postcode');

        $record = PostCode::where('postcode', $postcode)->first();

        if (!$record) {
            return response()->json(['message' => 'Postcode not found'], 404);
        }

        return response()->json([
            'prefecture' => $record->prefecture,
            'city' => $record->city,
            'local' => $record->local,
        ]);
    }
}

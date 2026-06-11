import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { volunteerSchema, zodFieldErrors } from "@/lib/validators";

function validationResponse(error) {
  return NextResponse.json(
    {
      error: "Please review the highlighted fields.",
      fields: zodFieldErrors(error),
    },
    { status: 400 },
  );
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = volunteerSchema.safeParse(body);

    if (!parsed.success) {
      return validationResponse(parsed.error);
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true });
    }

    const supabase = getSupabaseServer();
    const { error } = await supabase.from("volunteer_registrations").insert({
      full_name: data.fullName,
      email: data.email,
      phone: data.phone,
      qualification: data.qualification,
      expertise: data.expertise,
      experience_years: data.experienceYears ?? null,
      available_days: data.availableDays,
      city: data.city,
      motivation: data.motivation || null,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const isConfigError = error.message?.includes("Supabase");

    return NextResponse.json(
      {
        error: isConfigError
          ? "Supabase is not configured yet. Add your project URL and anonymous key to .env.local."
          : "Unable to submit the volunteer registration. Please try again.",
      },
      { status: isConfigError ? 503 : 500 },
    );
  }
}

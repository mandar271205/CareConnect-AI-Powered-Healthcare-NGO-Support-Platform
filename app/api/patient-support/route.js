import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabaseServer";
import { patientSupportSchema, zodFieldErrors } from "@/lib/validators";
import { generateTicketId } from "@/lib/ticketGenerator";
import { buildPatientAutomation } from "@/lib/requestAutomation";

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
    const parsed = patientSupportSchema.safeParse(body);

    if (!parsed.success) {
      return validationResponse(parsed.error);
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ ok: true, data: null });
    }

    const ticketId = generateTicketId();
    const automation = buildPatientAutomation(data);
    const supabase = getSupabaseServer();

    const { error } = await supabase.from("patient_registrations").insert({
      ticket_id: ticketId,
      full_name: data.fullName,
      age_group: data.ageGroup,
      contact_number: data.contactNumber,
      email: data.email || null,
      city: data.city,
      support_types: data.supportTypes,
      description: data.description || null,
      preferred_contact: data.preferredContact,
      priority: automation.priority,
      suggested_team: automation.suggestedTeam,
      generated_summary: automation.generatedSummary,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      ok: true,
      data: {
        ticketId,
        preferredContact: data.preferredContact,
        ...automation,
      },
    });
  } catch (error) {
    const isConfigError = error.message?.includes("Supabase");

    return NextResponse.json(
      {
        error: isConfigError
          ? "Supabase is not configured yet. Add your project URL and anonymous key to .env.local."
          : "Unable to submit the support request. Please try again.",
      },
      { status: isConfigError ? 503 : 500 },
    );
  }
}

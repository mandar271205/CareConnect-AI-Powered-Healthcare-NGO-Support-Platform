const teamBySupportType = {
  "General healthcare support": "Community Care Desk",
  "Maternal support": "Maternal Care Coordinator",
  "Paediatric support": "Child Wellness Team",
  "Dental support": "Dental Outreach Team",
  "Mental-health support": "Support Coordination Desk",
};

const urgentKeywords = ["emergency", "urgent", "immediate", "critical", "severe"];
const priorityKeywords = [
  "elderly",
  "child",
  "appointment",
  "follow-up",
  "unable",
  "soon",
  "help needed",
];

export const emergencyDisclaimer =
  "CareConnect is not an emergency service. Please contact local emergency services or a nearby healthcare provider immediately.";

export function suggestTeam(supportTypes) {
  if (!Array.isArray(supportTypes) || supportTypes.length !== 1) {
    return "NGO Help Desk";
  }

  return teamBySupportType[supportTypes[0]] || "NGO Help Desk";
}

export function classifyPriority(description = "") {
  const text = description.toLowerCase();

  if (urgentKeywords.some((keyword) => text.includes(keyword))) {
    return "Urgent Review";
  }

  if (priorityKeywords.some((keyword) => text.includes(keyword))) {
    return "Priority Review";
  }

  return "Normal Priority";
}

export function generateSummary({
  fullName,
  supportTypes,
  preferredContact,
  suggestedTeam,
  priority,
}) {
  const firstName = fullName.trim().split(/\s+/)[0] || "the requester";
  const supportLabel = supportTypes
    .map((type) => type.toLowerCase())
    .join(supportTypes.length > 1 ? ", " : "");

  return `A non-emergency support request was submitted by ${firstName}. The requester selected ${supportLabel} and prefers follow-up through ${preferredContact}. The request has been routed to the ${suggestedTeam} and marked as ${priority}.`;
}

export function buildPatientAutomation(data) {
  const suggestedTeam = suggestTeam(data.supportTypes);
  const priority = classifyPriority(data.description);
  const generatedSummary = generateSummary({
    fullName: data.fullName,
    supportTypes: data.supportTypes,
    preferredContact: data.preferredContact,
    suggestedTeam,
    priority,
  });

  return {
    priority,
    suggestedTeam,
    generatedSummary,
    emergencyDisclaimer:
      priority === "Urgent Review" ? emergencyDisclaimer : "",
  };
}

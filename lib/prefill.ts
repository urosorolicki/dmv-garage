// Lets any "ask about this service" link preselect the service in the contact form.
export type ServiceValue = "led" | "chiptuning" | "elektronika" | "enterijer"

export const PREFILL_SERVICE_EVENT = "dmv:prefill-service"

export function requestService(service: ServiceValue) {
  window.dispatchEvent(new CustomEvent<ServiceValue>(PREFILL_SERVICE_EVENT, { detail: service }))
}

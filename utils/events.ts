/**
 * buttons are automatically being tracked by GTM
 * this function should be used in places where we click on interactive elements which are not buttons (like links)
 */
export function trackButtonClick({ id }: { id: string }) {
  window.dataLayer?.push({
    event: 'button_click',
    elementId: id,
  });
}

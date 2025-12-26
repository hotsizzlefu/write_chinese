// A sample list of common Chinese characters. 
// In a real production app, this should be expanded to 2000 characters.
export const ALL_CHARS = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各它最想已月支政此惠解路员无系提情目系正文手实通关量指气题问身比觉解接感情数利每角解接感情数利每角做保建受改际张接打变界少海光口风和别".split('');

// Ensure we have enough unique characters
export const getDailyChars = (seed, count = 20) => {
  // Simple pseudo-random shuffle based on seed (day + random)
  // For now, just random shuffle
  const shuffled = [...ALL_CHARS].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

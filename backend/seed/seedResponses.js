/**
 * Seed Responses
 * Creates 0-8 high-quality, contextually relevant responses per question
 * Responses are hardcoded and mapped to specific questions
 */

import { getCollection, COLLECTIONS } from '../database_config/index.js';

/**
 * Hardcoded response mappings for each question
 * Key: question title
 * Value: array of response content strings (0-8 responses)
 *
 * Distribution strategy:
 * - Simple/straightforward questions: 1-3 responses
 * - Moderate complexity: 3-5 responses
 * - Complex/interesting questions: 5-8 responses
 * - Some questions: 0 responses (very new, no activity yet)
 */
const questionResponseMap = {
  // ============================================================================
  // CS545 - Human Computer Interaction (25 questions)
  // ============================================================================

  // Tidwell Patterns
  'Understanding Tidwell design patterns for navigation': [
    'Hub and Spoke is like a home button that takes you to a central hub, then you navigate to different sections. Think of mobile apps with a bottom nav bar. Pyramid is more hierarchical - users drill down through categories. Like Amazon: Home > Electronics > Phones > iPhone.',
    'Great question! Hub and Spoke gives users a familiar starting point (the hub) and is better when sections are independent. Pyramid works when content has natural categories and subcategories. For your project, if users need to switch between unrelated sections frequently, go with Hub and Spoke.',
    'I just covered this in my design! Hub and Spoke = always return to center. Pyramid = drill down deeper. H&S is better for task-based apps, Pyramid for content-heavy sites.',
    'The professor mentioned that Hub and Spoke prevents users from getting lost because they can always return to the hub. Pyramid can feel like a maze if not designed carefully.',
    'Think of it this way: Hub and Spoke is like a star shape - center with spokes radiating out. Pyramid is a tree structure. Choose based on your content structure!',
  ],

  'Tidwell\'s "Safe Exploration" pattern - how to implement?': [
    'Safe Exploration means users can explore without fear of breaking things or losing work. Key elements: undo/redo buttons, auto-save, confirmation dialogs for destructive actions, and clear "cancel" options.',
    'For prototyping, include: 1) A visible undo button, 2) Preview modes before committing changes, 3) Breadcrumbs showing where users are, 4) Clear exit paths. Test it by asking users to "just try clicking around" and see if they hesitate.',
    'I implemented this with autosave + a "Restore previous version" option. Also added tooltips that say "This won\'t be saved until you click Save" for risky actions.',
    "The pattern is about psychological safety. Users explore more when they know they can't mess up. Add visual feedback for reversible vs permanent actions - like making delete buttons red.",
  ],

  "John Maeda's Law of Reduce - how far is too far?": [
    "You've gone too far when users can't complete their tasks. The test: can a new user accomplish the main goal without help? If not, you've reduced too much.",
    "Maeda says to reduce meaningfully, not just arbitrarily. Keep reducing until something breaks, then add back one step. That's your minimum.",
    "I struggle with this too! My rule: remove anything that doesn't directly serve the user's goal. But keep one level of redundancy for critical actions.",
    'Test with real users. If they ask "how do I..." for basic features, you removed too much. If they say "this is so clean and simple!" you nailed it.',
    'The Law of Reduce is about ruthless prioritization. Ask: does this element earn its space? If you hesitate, cut it. You can always add back later.',
  ],

  'Laws of Simplicity - CONTEXT in practice': [
    'Context means the stuff around your main content isn\'t "extra" - it\'s essential for understanding. Example: breadcrumbs seem peripheral but they tell users where they are. Remove them and users get lost.',
    'Great example from the book: a white wall makes a painting stand out. The wall is peripheral but crucial for context. In UI: whitespace, navigation bars, status indicators - they frame the main content.',
    "Think of it like this: the frame isn't the picture, but without it, the picture has less impact. In your design, context is the navigation, headers, and layout structure.",
    'Practical example: when you see a form, the labels and help text are peripheral but essential. Remove them and the form becomes unusable even though the input fields (the "main" content) are still there.',
  ],

  'Organizing complexity vs hiding complexity': [
    "Organize when users need to understand the structure - like file systems where folders show hierarchy. Hide when complexity would overwhelm - like Mac's Spotlight search hiding the file system.",
    "Good rule from my UX class: organize if users will revisit and need to build a mental model. Hide if it's one-time or advanced features most users don't need.",
    'Progressive disclosure is the middle ground - organize the common stuff, hide the advanced stuff behind a "More options" or "Advanced" panel.',
    'I use this guideline: if more than 50% of users need it, organize it visibly. If less than 20% need it, hide it. In between? Make it discoverable but not prominent.',
    'Think about your settings page - organize by category (Account, Privacy, Notifications) but hide the technical stuff (API keys, debug mode) in an "Advanced" section.',
  ],

  // Microinteractions
  'Microinteractions - what counts as one?': [
    'A microinteraction is a single-purpose interaction - one task, one goal. A like button animation is definitely a microinteraction. A loading spinner is too! Both are contained, focused interactions.',
    'The definition: a small, contained product moment centered around a single use case. Examples: pull to refresh, a toggle switch, heart animation on double-tap. Each completes one specific action.',
    'Yes to both your examples! The key is "micro" - it\'s small and focused. A login flow isn\'t a microinteraction (too complex), but the password visibility toggle is.',
    'Dan Saffer (who wrote the book on microinteractions) says: if you can describe it in one sentence with one verb, it\'s probably a microinteraction. "User likes post" = microinteraction. "User creates account" = too big.',
  ],

  'Trigger, Rules, Feedback, Loops - help with structure': [
    'Toggle switch example: TRIGGER = user taps switch. RULES = if off→turn on, if on→turn off. FEEDBACK = switch slides + color change + maybe haptic. LOOPS = maintains state, visual shows current state.',
    'Perfect question for learning the structure! Another example - Like button: TRIGGER = tap heart. RULES = if not liked→add like, if liked→unlike. FEEDBACK = heart fills with color + count increases + animation. LOOPS = persists your like, shows you already liked it on return.',
    "Here's the simplest explanation: Trigger (what starts it), Rules (what happens), Feedback (how user knows it happened), Loops (what changes for next time). Every microinteraction has all four.",
    'I like thinking of it as: someone does something (trigger) → system follows logic (rules) → system responds (feedback) → system remembers (loops). Simple!',
  ],

  'Designing feedback for microinteractions': [
    'Visual is essential - users expect to see something. Sound can enhance but should be optional (many users mute). Haptics are great for mobile but not all devices support it. Best practice: visual + one other.',
    "Feedback needs to be immediate (under 100ms) and proportional. Don't use a huge animation for a small action. A like button needs a subtle animation, not a full-screen celebration.",
    'Different feedback for different contexts: visual is universal, sound for notifications, haptics for confirmation of destructive actions (like iOS uses haptic for Face ID failure).',
    'The professor emphasized multi-sensory feedback is more memorable, but visual should never be the only feedback - think about accessibility. Screen readers need audio cues too.',
    'Good question! I use this approach: visual for all, haptic for mobile actions, sound only for important notifications. And always make sound optional!',
  ],

  // PAR Framework
  'PAR framework - Perception principles question': [
    'Yes, proximity is key for forms! Related fields (like first name + last name) should be visually grouped closer together than unrelated fields (name vs payment info). It reduces cognitive load.',
    'Gestalt proximity principle means things close together are perceived as related. In forms: group shipping address fields together, payment fields together, with whitespace between groups.',
    "Definitely group related fields. But also consider the Law of Prägnanz - users see patterns. So if you group inconsistently, it's worse than not grouping at all. Be systematic!",
    'From a perception standpoint, you can also use containers (light borders or background colors) to group related fields. Combined with proximity, it makes the structure obvious.',
  ],

  'Attention management in complex dashboards': [
    'Use visual hierarchy! Size, color, position, and motion. Make the most important metric biggest and top-left. Use color sparingly - highlight only what needs attention. Avoid animation unless something requires immediate action.',
    'The F-pattern and Z-pattern reading patterns are your friends. Put critical info in top-left, secondary info top-right. Users scan in these patterns naturally.',
    "I built a dashboard last semester - here's what worked: 1) Use a clear grid layout, 2) Make primary metrics 2x-3x larger, 3) Use red only for alerts, 4) Group related metrics together.",
    'Motion attracts attention - but use it carefully. Only animate things that are urgent or time-sensitive. Everything else should be static. Too much motion and nothing stands out.',
    'Think about the "6-second rule" - users should be able to identify the most important thing within 6 seconds. Use size, color contrast, and position to guide them.',
    'Try the squint test! Squint at your dashboard - what stands out? That better be your most important info. If everything looks equally prominent, nothing is.',
  ],

  'Retention in PAR - designing memorable interfaces': [
    "Memorable doesn't mean gimmicky - it means consistent and learnable. Use familiar patterns (like hamburger menu), maintain consistency, and use recognizable icons. Users remember patterns, not novelty.",
    "The key is to build on existing mental models. If your interface works like other tools users know, they'll remember it better. Unique for the sake of unique is forgettable.",
    'Retention comes from recognition, not recall. Use icons + labels, keep navigation consistent, maintain visual patterns. Users should recognize where to go, not remember it.',
    "From my HCI reading: repetition aids retention. If users perform an action multiple times in the same way, they'll remember it. So consistency across your interface is crucial for memory.",
  ],

  'PAR and color coding - attention vs perception': [
    "The 5-7 rule comes from working memory limits (Miller's Law). More than 7 colors and users can't distinguish or remember what each means. I stick to 5 max - better safe than sorry.",
    'For color coding: use 3-4 categorical colors (like status: green=good, yellow=warning, red=error), not 7. Users can hold about 4 chunks in working memory according to recent research.',
    'Also consider colorblind users! Red-green is the most common colorblindness. Use redundant encoding - color + shape or color + icon. And test with a colorblind simulator.',
    'The professor mentioned using semantic colors (red=danger, green=success) rather than arbitrary assignments. Fewer colors, more meaningful. I use max 4-5 in my designs.',
    "Think about it practically: traffic lights use 3 colors. That's universally understood. More than that and you need a legend, which defeats the purpose of quick perception.",
  ],

  // User Feedback
  'User feedback collection methods comparison': [
    'Think-aloud protocol = users speak their thoughts while using your interface. Cognitive walkthrough = you walk through tasks step-by-step predicting problems. Think-aloud is better for discovering unexpected issues, walkthrough is better early in design.',
    "Use think-aloud when you have a prototype and want to see how users actually interact. Use cognitive walkthrough when you're still in early design and want expert evaluation. Different stages, different tools.",
    'Think-aloud gives you real user behavior and surprises you (in good and bad ways). Cognitive walkthrough is faster and cheaper but only catches what evaluators predict. I do walkthrough first, think-aloud later.',
    "The professor emphasized: think-aloud for usability testing with real users, cognitive walkthrough for expert review or when you can't access users yet. Complement each other well!",
  ],

  'Interpreting conflicting user feedback': [
    "Look for patterns! If one person says too cluttered and another says too minimal, but 8 others are fine with it, you're probably okay. Don't optimize for edge cases.",
    'Consider your target users. If your power users want more features visible and novices want less, you might need modes or customization. Or use progressive disclosure to satisfy both.',
    'I had this exact issue! Solution: watched the recordings of user tests to understand the "why" behind their feedback. Often they wanted the same thing but described it differently.',
    "Conflicting feedback often means you need to clarify your primary user persona. You can't please everyone. Design for your main user group, not the extremes.",
    'Try the "5 Whys" technique. Ask why they feel it\'s cluttered/minimal. Often you\'ll find they want the same outcome (e.g., faster task completion) but have different ideas about solutions.',
  ],

  'Sample size for user feedback sessions': [
    'The "5 users catch 80%" rule is from Nielsen Norman Group. It\'s true for usability testing of a specific interface. But for diverse user groups or complex systems, you need more - maybe 5 per user segment.',
    'It depends on your user diversity. Homogeneous users? 5 is often enough. Diverse user base (different ages, tech literacy, goals)? You need 3-5 per segment. Could be 15-20 total.',
    'From my research methods class: 5 is a good starting point for iterative testing. Test with 5, fix issues, test with 5 more. Better than testing with 20 all at once.',
    "The 80% rule assumes you're testing for usability issues. For other research (understanding user needs, preferences), you might need 10-20+ users for qualitative studies, or hundreds for quantitative.",
    "Practical advice: start with 5. If you're still discovering major new issues with user 5, test 5 more. If users 4-5 revealed nothing new, you've probably hit diminishing returns.",
  ],

  // Prototyping
  'Low-fi vs high-fi prototyping - when to transition?': [
    "Transition when you've validated the basic flow and information architecture. If users are still confused about navigation or core features in low-fi, don't go high-fi yet. High-fi is for testing visual design and micro-interactions.",
    'I move to high-fi when: 1) Users can complete main tasks in low-fi without major confusion, 2) The IA is solid, 3) I need to test visual hierarchy, colors, or branding. Low-fi for structure, high-fi for polish.',
    "Don't transition too early! I made that mistake - spent time on visual design when the core interaction model was still broken. Fix the foundation in low-fi first.",
    'The professor said: "Low-fi until you\'re testing pixels and polish, not structure and flow." If users are still giving feedback about layout and navigation, stay low-fi. It\'s faster to iterate.',
  ],

  'Prototyping tools - Figma vs Balsamiq': [
    'Balsamiq is designed for low-fi wireframes - intentionally sketchy look so users focus on functionality not design. Figma can do both low-fi and high-fi, plus it has great collaboration features. I use Balsamiq for quick low-fi, Figma for everything else.',
    'Figma is more versatile - wireframes to high-fi prototypes to dev handoff. But that versatility can be a trap - you might spend time on visual details too early. Balsamiq keeps you focused on structure.',
    'If you need to collaborate in real-time, Figma wins. If you want to quickly sketch ideas without getting distracted by design, Balsamiq. I use both depending on project stage.',
    'Figma has components, auto-layout, and prototyping features that Balsamiq lacks. But Balsamiq is simpler and faster for pure wireframing. Choose based on your needs!',
  ],

  'Interactive vs static prototypes': [
    "Interactive prototypes are worth it when you're testing flows, navigation, or dynamic interactions (like drag-and-drop, animations). For testing visual design or initial concepts, static is faster and fine.",
    'I use interactive when testing multi-step processes - like checkout or onboarding. Seeing users actually click through reveals issues static mockups miss, like confusing button placement or unclear next steps.',
    "The extra time for interactive pays off when testing complex interactions. But for simple screens or early concepts, static + explanation is sufficient. Don't over-invest early.",
    "Interactive prototypes reveal problems with transitions and flow that static can't. Like: where does clicking this button go? Is the navigation clear? Can users complete tasks? Critical for usability testing.",
    'Think about your test goals. Testing visual hierarchy? Static. Testing task completion? Interactive. Testing whether an idea resonates? Static. Testing navigation flow? Interactive.',
  ],

  // Paper Prototyping
  'Paper prototyping for mobile apps - best approach?': [
    'Draw individual screens on index cards or sticky notes. Makes it easy to simulate navigation - just swap out the "screen" when user taps a button. I also draw a phone frame on paper to set context.',
    'Individual screens work better than continuous scroll. You can shuffle screens, add new ones, and simulate app navigation. Also, use small paper (around phone size) so it feels realistic.',
    'I cut out phone-sized rectangles from cardstock, drew screens on them. During testing, I\'d swap screens when users "tapped" buttons. Worked great! Also had a "keyboard" card to slide in when they needed to type.',
  ],

  'Testing interactions with paper prototypes': [
    'Prepare multiple states! For example, if testing a toggle, have two cards: one with toggle OFF, one with toggle ON. Swap them when user taps. For swipe, slide the new screen in from the side.',
    'I verbally explain some interactions ("imagine this transitions smoothly") but try to show as much as physically possible. Prepare state changes as separate paper screens.',
    'The "wizard of oz" technique works great - you\'re the system. User gestures or speaks their action, you swap out paper to show the result. Practice beforehand so it\'s smooth!',
    "For drag-and-drop, use small paper cutouts that users can actually move around. For swiping between screens, slide new paper screens in. Make it as physical as possible - it's fun and effective!",
  ],

  'Paper prototyping - materials and setup': [
    'I use: index cards for screens, sticky notes for movable UI elements, markers in different colors, and a large phone-shaped frame drawn on cardstock. Quick, cheap, works great!',
    'Sticky notes are amazing for prototyping - you can rearrange elements easily. I also use transparency sheets for overlays (like modal dialogs). And keep white-out tape handy for quick changes!',
    "Keep it simple: paper, pencils, scissors. The sketchy look is actually a feature - users know it's a rough concept and give honest feedback instead of complimenting your design skills.",
    'Pro tip: use graph paper for consistent sizing and alignment. Also helps you maintain a rough grid system. And take photos after each iteration - great for documentation!',
  ],

  // Wireframing
  'Wireframe annotation best practices': [
    "Document key interactions and anything that isn't obvious from the wireframe alone. Don't annotate every label and button - that's visual clutter. Focus on flows, states, and behavior.",
    'I annotate: conditional logic (what happens if X?), interactive elements (what does this button do?), dynamic content (where does this data come from?), and edge cases. Enough for developers to implement.',
    'Think of your audience. Annotate for whoever is consuming your wireframes. For clients: high-level behavior. For developers: technical details and edge cases. Tailor it!',
    'Use numbered annotations with a legend/notes section below the wireframe. Keeps the wireframe clean while providing necessary details. Also helps in presentations.',
  ],

  'Wireframes vs mockups - clarity on difference': [
    'Wireframe = structure, layout, functionality. Low visual fidelity, grayscale, boxes and lines. Mockup = visual design, colors, typography, images. High fidelity. Wireframes answer "what and where", mockups answer "how it looks".',
    'Think of building a house: wireframe is the blueprint (where walls, doors, plumbing go), mockup is the interior design (colors, furniture, finishes). Both important, different purposes.',
    "Wireframes are about IA and UX. Mockups are about UI and visual design. Wireframe first to validate structure, mockup later to validate aesthetics. Don't skip wireframing!",
  ],

  'Wireframing tools and standards': [
    "There are loose conventions: rectangles with X for images, horizontal lines for text, boxes for buttons. But it's not as strict as flowcharts. Clarity matters more than following symbols.",
    'Most tools (Figma, Sketch, Balsamiq) have wireframe kits with standard UI elements. Use those for consistency. Or create your own component library once you establish a pattern.',
    'The "standard" is basically: use simple shapes, grayscale, clear labels. Make it clear what each element is (button, image, text block). That\'s about it - no formal notation like UML.',
  ],

  'Content hierarchy in wireframes': [
    'Use size, weight, and spacing! Make headings bigger than body text, use bolder lines for important elements, add more whitespace around key content. Even in grayscale, hierarchy is clear.',
    'Box sizing and position work great. Bigger boxes = more important. Top-left = highest priority (F-pattern). Also use repetition - consistent styling for similar importance levels.',
    'I number elements (1, 2, 3) to show reading/priority order, use thicker borders for high-priority items, and vary box sizes. Also grouping - put related items close together.',
    'Indentation and nesting show hierarchy too. Primary nav → secondary nav (indented) → tertiary options (more indented). Creates a clear information architecture in the wireframe itself.',
  ],

  // ============================================================================
  // CS590 - Algorithms (30 questions)
  // ============================================================================

  'Big O vs Big Theta - practical difference': [
    'Big O is worst-case upper bound - the limit it won\'t exceed. Big Theta is tight bound - both upper AND lower bound. Theta is more precise. Use O when you only care about "won\'t be slower than", Theta when you know the exact growth rate.',
    'Think of it like this: O is "at most", Theta is "exactly". Binary search is O(log n) but also Θ(log n) because log n is tight. But a simple loop could be O(n²) if the worst case is bad, even if average is O(n).',
    'Use Theta when average and worst case are the same growth rate. Use O when they differ or when you want to emphasize worst-case guarantee. In practice, most people just use O for everything.',
    "Big Theta is more precise and informative. But Big O is more commonly used because it's simpler - just analyze worst case. For academic work, prefer Theta when you can prove it.",
  ],

  'Tight bounds vs loose bounds in Big O': [
    "Yes, if something is O(n log n), it's also O(n²), O(n³), O(2^n), etc. But we prefer tight bounds because they're more informative. Saying \"it's at most exponential\" is technically true but useless if it's actually logarithmic.",
    "Tight bounds give you the most useful information about actual performance. Saying bubble sort is O(2^n) is technically correct but misleading - it's actually O(n²). Always give the tightest bound you can prove.",
    'Think of it as honesty in communication. A loose bound is like saying "I\'ll be there within 24 hours" when you know you\'ll arrive in 30 minutes. Technically true, but not helpful!',
  ],

  // Iterative Analysis
  'Analyzing nested loops - is it always O(n²)?': [
    "Not always! It depends on how many times the inner loop runs. If the inner loop runs i times (where i is the outer loop variable), it's O(n²). If it runs a constant number of times regardless of n, it's O(n). If it runs log n times, it's O(n log n).",
    "You need to count total iterations. If outer loop runs n times and inner runs m times, it's O(n*m). If m depends on n (like i or n-i), you need to sum it up. Example: i from 0 to n, j from 0 to i gives 1+2+3+...+n = n(n+1)/2 = O(n²).",
    "Classic example where it's NOT O(n²): outer loop i from 0 to n, inner loop j from 0 to 10 (constant). Total iterations = n * 10 = O(n), not O(n²).",
    "Draw it out! Make a small example (n=5) and count actual iterations. That gives you intuition. Then generalize with math. If you see a sum like Σ(i=1 to n), that's n(n+1)/2 = O(n²).",
  ],

  'Loop analysis with decreasing iterations': [
    "Yes, if i = i/2 each iteration, that's logarithmic! You're halving each time, so you can only halve log₂(n) times before reaching 1. Classic example: binary search. O(log n).",
    "Anytime you divide by a constant each iteration (i/2, i/3, etc.), it's logarithmic. If you subtract by a constant (i-1, i-2), it's linear. Division → log, subtraction → linear.",
    "Think of it this way: how many times can you divide n by 2 until you hit 1? That's log₂(n). So a loop that halves each iteration runs log n times.",
    'The pattern: multiplicative decrease (i/2, i*0.5) = logarithmic. Additive decrease (i-1, i-10) = linear. This is key for loop analysis!',
  ],

  // Recursive Analysis
  'Recurrence relation setup - how to start?': [
    'Step 1: Identify the recursive calls - how many and with what input size? Step 2: Identify the work done per call (outside the recursion). Then write T(n) = [number of calls] * T([input size]) + [work per call].',
    'Example: merge sort. It splits array in half (2 recursive calls), on arrays of size n/2, and does O(n) work to merge. So T(n) = 2T(n/2) + O(n). Base case: T(1) = O(1).',
    'The formula: T(n) = aT(n/b) + f(n), where a = number of subproblems, b = factor by which size decreases, f(n) = work outside recursion. Just identify these three things!',
    "Don't forget base case! Usually T(1) = O(1) or T(0) = O(1). And be careful with the non-recursive work - is it constant, linear, or something else? That's your f(n).",
  ],

  'Substitution method for solving recurrences': [
    "Make an educated guess based on the structure. If it looks like divide-and-conquer (T(n) = 2T(n/2) + n), guess O(n log n). If it's T(n) = T(n-1) + n, guess O(n²). Then prove by induction.",
    'Start with a similar problem you know. T(n) = 2T(n/2) + n looks like merge sort, so guess O(n log n). Then use induction: assume T(k) ≤ c*k*log(k) for k < n, prove it for T(n).',
    "The guess is the hard part. Use recurrence tree method or Master theorem to get an idea first, then formalize with substitution. Or look at similar recurrences you've solved before.",
    "Pro tip: if your induction proof fails, adjust your guess. Maybe you guessed O(n log n) but need O(n log² n), or you need to subtract lower-order terms. It's an iterative process!",
  ],

  // Master Theorem
  'Master theorem - when can I apply it?': [
    'Master Theorem applies to recurrences of the form T(n) = aT(n/b) + f(n), where a ≥ 1, b > 1, and f(n) is asymptotically positive. Your example T(n) = 2T(n/2) + n log n fits this form, so yes!',
    'The conditions: a ≥ 1 (number of subproblems), b > 1 (factor of size reduction), f(n) must be polynomial. If your recurrence fits this template, you can apply it. Just identify a, b, and f(n).',
    "For T(n) = 2T(n/2) + n log n: a=2, b=2, f(n)=n log n. Check! Now compare f(n) with n^(log_b a) = n^(log_2 2) = n^1 = n. Since n log n is asymptotically larger than n, you're in case 3 (with regularity condition).",
    "It doesn't apply if: the recurrence doesn't split evenly (like T(n) = T(n-1) + n), or if a and b aren't constants, or if f(n) has weird behavior. Otherwise, you're good!",
  ],

  'Master theorem three cases - which one applies?': [
    "Compare f(n) with n^(log_b a). Case 1: f(n) is polynomially smaller → answer is n^(log_b a). Case 2: they're equal → answer is n^(log_b a) * log n. Case 3: f(n) is polynomially larger → answer is f(n).",
    'The key word is "polynomially". Smaller/larger by at least n^ε for some ε > 0, not just by logarithmic factors. Example: n vs n² (polynomial) vs n vs n log n (not polynomial, only logarithmic).',
    'For your example with f(n) and n^(log_b a): if f(n) = O(n^(log_b a - ε)), use case 1. If f(n) = Θ(n^(log_b a)), use case 2. If f(n) = Ω(n^(log_b a + ε)), use case 3 (check regularity!).',
    "Practical tip: calculate log_b a first. Then compare exponents. If f(n)'s exponent is smaller, case 1. If equal, case 2. If larger, case 3. For logarithmic differences, case 2 usually applies.",
    'Example: T(n) = 2T(n/2) + n. Here a=2, b=2, so n^(log_b a) = n. f(n) = n = Θ(n). Equal! Case 2. Answer: Θ(n log n).',
  ],

  // Recursion Tree
  'Drawing recursion trees - systematic approach': [
    "Start with root node = full problem T(n). Draw children = subproblems. For T(n) = 2T(n/2) + n, root has cost n, two children each with cost n/2. Keep expanding until you hit base case. You don't need to draw every node, just enough to see the pattern.",
    'Systematic steps: 1) Draw root with full problem size, 2) Show branching factor (how many children?), 3) Label each level with work done, 4) Identify depth (how many levels until base case?), 5) Sum work across all levels.',
    'Pro tip: draw 3-4 levels, then use "..." to indicate continuation. Calculate work at each level. Notice the pattern. Often it\'s geometric series or constant per level. Then multiply by depth.',
    'Example: T(n) = 2T(n/2) + n. Level 0: n. Level 1: n/2 + n/2 = n. Level 2: n/4 + n/4 + n/4 + n/4 = n. Pattern: n work per level, log n levels, total = n log n.',
  ],

  'Summing costs in recursion tree': [
    "Calculate work at each level first. If it's constant per level (like n each time), multiply by depth. If it's decreasing (like n, n/2, n/4...), it's a geometric series - sum using the formula.",
    'For geometric series: a + ar + ar² + ... = a(1-r^k)/(1-r), where r is the ratio and k is number of terms. Often the first term dominates, giving you the Big O.',
    "Look for patterns! If each level has same work (merge sort), just multiply by depth. If each level has half the previous work (some divide and conquer), the root dominates. If each level doubles (like Fibonacci naive), it's exponential.",
    "Don't sum every single node - that's tedious. Sum by level. Count nodes at each level and work per node. Multiply. Then sum across levels. Much simpler!",
  ],

  // Searching
  'Binary search implementation - mid calculation': [
    'Use mid = low + (high - low) / 2. The naive (low + high) / 2 can overflow if low and high are large integers! In languages like Java and C++, integer overflow is a real issue. The safer version prevents this.',
    'Great catch! The overflow issue is subtle. If low and high are both large (say, close to MAX_INT), their sum exceeds MAX_INT and wraps around negative. low + (high - low) / 2 avoids this.',
    "In Python, integers can be arbitrarily large so overflow isn't an issue. But in Java, C++, C#, use the safe version. Better to build good habits!",
    "Both give the same answer in normal cases. But in production code with large arrays, use the safe version. It's a classic bug that's bitten many programmers!",
  ],

  'When is linear search better than binary search?': [
    "Linear is better when: 1) Array is unsorted (binary requires sorted), 2) Array is very small (binary search overhead isn't worth it), 3) You're searching for first occurrence in unsorted data, 4) Memory constrained and can't sort.",
    'Also, if you only search once and array is unsorted, sorting first + binary search takes O(n log n) + O(log n) = O(n log n). Linear search is O(n). So linear wins for one-time searches!',
    'For very small n (like n < 10), linear search is simpler and practically as fast. The constant factors and code simplicity matter more than asymptotic complexity.',
    "If the element you're searching for is likely near the beginning, linear search can be faster in practice even on sorted data. Binary is better for average/worst case, but linear can win for specific data distributions.",
  ],

  // Sorting
  'Quicksort pivot selection strategies': [
    'Common strategies: 1) First element (simple but worst on sorted data), 2) Last element (same issue), 3) Random element (good average case, avoids worst case on sorted data), 4) Median-of-three (first, middle, last - balances simplicity and performance).',
    'Random pivot is my go-to. It gives O(n log n) expected time and avoids the O(n²) worst case on already-sorted arrays. Median-of-three is slightly better in practice but more complex.',
    'The worst case O(n²) happens with bad pivots (always smallest or largest). This happens if you pick first element and array is sorted/reverse sorted. Random or median-of-three prevents this!',
    'In real implementations (like C++ std::sort), they use a hybrid: quicksort with median-of-three pivot, switching to insertion sort for small subarrays, and falling back to heapsort if recursion depth gets too deep. Pretty sophisticated!',
  ],

  'Merge sort vs quicksort - when to use which?': [
    'Merge sort: stable, guaranteed O(n log n), but needs O(n) extra space. Quicksort: in-place (O(log n) stack space), usually faster in practice, but O(n²) worst case. Use merge when stability and worst-case guarantee matter, quicksort for average-case speed.',
    'If you need stability (preserving order of equal elements), use merge sort. Quicksort is unstable. If memory is tight, quicksort is in-place while merge needs O(n) extra array.',
    "Quicksort has better cache locality (in-place operations), so it's often faster in practice despite same O(n log n) average case. But for guaranteed performance, merge sort wins.",
    'I use merge sort for: linked lists (no extra space needed!), when stability matters, when worst-case guarantee is critical. Quicksort for: arrays, when average-case speed matters, when memory is limited.',
    "Fun fact: Python's built-in sort uses Timsort (hybrid of merge sort and insertion sort) for stability and good performance. Java uses dual-pivot quicksort for primitives, merge sort for objects (stability).",
  ],

  'Stable vs unstable sorting': [
    'Stable sort preserves relative order of equal elements. Example: sorting students by grade, then by name. Stable sort keeps names alphabetized within each grade. Unstable sort might scramble them.',
    'You care about stability when: 1) Sorting by multiple keys (sort by secondary key first, then primary key), 2) Data has meaningful original order you want to preserve, 3) The tied elements have other attributes that matter.',
    'Stable algorithms: merge sort, insertion sort, bubble sort, counting sort. Unstable: quicksort, heapsort, selection sort. You can make any algorithm stable by adding original index as tiebreaker, but it adds overhead.',
    'Real example: you have student records sorted by name. You want to sort by grade while keeping names alphabetical within each grade. Use stable sort on grade field. Done! Unstable sort would mess up the name ordering.',
  ],

  // Trees
  'Binary tree vs binary search tree': [
    "Binary tree: each node has at most 2 children. That's it. BST: binary tree with the ordering property (left child < parent < right child). All BSTs are binary trees, but not all binary trees are BSTs.",
    'The ordering property is the key difference. BST lets you search, insert, and delete in O(log n) average time (O(h) where h is height). Regular binary tree has no such guarantee - searching could be O(n).',
    'Think of it: binary tree is just a structural constraint (max 2 children). BST adds a semantic constraint (data must be ordered). The ordering enables efficient operations.',
    'Example: a binary tree could have 5 as root, 10 as left child, 3 as right child. That violates BST property! BST would require 3 on left, 10 on right.',
  ],

  'Tree traversal - inorder vs preorder vs postorder': [
    'Inorder (left-root-right) on BST gives sorted order - super useful! Preorder (root-left-right) is good for copying tree or prefix expressions. Postorder (left-right-root) is good for deleting tree or postfix expressions.',
    'Specific use cases: Inorder for BST → sorted list. Preorder for tree serialization (root first so you know structure when deserializing). Postorder for deletion (delete children before parent) or expression evaluation.',
    'In compilers: preorder for prefix notation (+ 3 4), inorder for normal notation (3 + 4), postorder for postfix notation (3 4 +). Each traversal matches a different expression format!',
    'Memory: preorder and inorder can be done with O(h) stack space (recursive or explicit stack). For threaded trees or Morris traversal, you can do inorder in O(1) space. Postorder is trickiest for iterative implementation.',
  ],

  // AVL Trees
  'AVL tree rotations - left vs right': [
    'Simple rule: if the tree is left-heavy (left subtree too tall), do right rotation. If right-heavy, do left rotation. Think of it as rotating the heavy side down to balance.',
    "More precisely: Left-Left case (left child's left subtree is heavy) → single right rotation. Right-Right case → single left rotation. Left-Right case → left rotation on child, then right rotation on parent. Right-Left case → opposite.",
    'I remember it as: the rotation direction is opposite to where the problem is. Left-heavy problem? Rotate right to bring it down. Right-heavy? Rotate left.',
    "Drawing it helps! If the imbalance is a straight line (left-left or right-right), single rotation fixes it. If it's a zigzag (left-right or right-left), you need double rotation to straighten first then balance.",
    "The four cases: LL (right rotation), RR (left rotation), LR (left then right), RL (right then left). That's all you need to memorize!",
  ],

  'AVL balance factor calculation': [
    'Balance factor = height of left subtree - height of right subtree. Range: [-1, 0, 1] for AVL tree. If it goes to -2 or +2, you need to rebalance with rotations.',
    "Some textbooks do right - left instead of left - right. Either works as long as you're consistent! I prefer left - right because positive = left-heavy feels intuitive.",
    'The key: balance factor tells you if tree is balanced. -1 to +1 is fine. -2 means right-heavy (need left rotation). +2 means left-heavy (need right rotation).',
    'Calculate recursively: BF(node) = height(left) - height(right). Height of null is -1 or 0 depending on convention. Just be consistent!',
  ],

  // Graphs
  'Graph representation - adjacency matrix vs list': [
    'Adjacency matrix: O(V²) space, O(1) edge lookup, O(V) to find all neighbors. Adjacency list: O(V+E) space, O(degree) edge lookup, O(degree) to find neighbors. Dense graphs → matrix. Sparse graphs → list.',
    'If E is close to V² (dense), matrix is fine. If E is close to V (sparse), list saves a lot of space. Most real-world graphs (social networks, web) are sparse, so adjacency list is common.',
    'Matrix is better when: you need fast "is there an edge between u and v?" queries. List is better when: you need to iterate over neighbors, or graph is sparse. Also, matrix wastes space for sparse graphs.',
    'In practice: adjacency list is more common because most graphs are sparse. But for graph algorithms that need fast edge queries (like Floyd-Warshall), matrix can be easier to work with.',
    "Space complexity: matrix is always O(V²). List is O(V + E). For sparse graph (E << V²), list wins big. For dense graph (E ≈ V²), they're similar.",
  ],

  'DFS vs BFS - when to use which?': [
    'DFS: good for path finding, cycle detection, topological sort, maze solving. Goes deep first. Uses stack (or recursion). BFS: good for shortest path (unweighted), level-order traversal, finding "nearest" nodes. Goes wide first. Uses queue.',
    'Use BFS when: you need shortest path in unweighted graph, you want to find nodes by distance from source, you need level-by-level processing. Use DFS when: you need to explore all paths, detect cycles, do topological sort, or memory is constrained.',
    'Memory: DFS uses O(h) space (height/depth), BFS uses O(w) space (width). For wide shallow graphs, DFS wins. For deep narrow graphs, BFS wins. For trees, BFS can use O(n) space at last level!',
    'Specific applications: DFS for detecting strongly connected components, solving puzzles (try all possibilities), maze generation. BFS for finding shortest path, testing bipartiteness, finding connected components in unweighted graphs.',
    'Implementation: DFS is easier recursive (stack is implicit). BFS must be iterative with explicit queue. Both are O(V + E) time for adjacency list representation.',
  ],

  'Dijkstra algorithm - negative weights question': [
    "Dijkstra assumes once you visit a node with shortest distance d, you'll never find a shorter path. With negative edges, this breaks! You might find a shorter path later via a negative edge, but Dijkstra won't reconsider already-visited nodes.",
    'Example: A→B cost 5, A→C cost 1, C→B cost -4. Dijkstra visits A (dist 0), then C (dist 1), marks C done. Then visits B via direct edge (dist 5), marks B done. Misses the shorter path A→C→B (dist -3) because C was already visited!',
    "For negative weights, use Bellman-Ford algorithm instead. It considers all edges V-1 times, so it catches paths that go through more nodes even if they have negative edges. Runtime is O(VE) vs Dijkstra's O((V+E)log V).",
    "The greedy assumption breaks down. Dijkstra greedily picks the nearest unvisited node, assuming that's optimal. With negative weights, going through more nodes can be shorter, violating the greedy choice.",
    "Note: Dijkstra works if no negative-weight CYCLES. If there are negative cycles, even Bellman-Ford won't work (shortest path is undefined - infinite loop!).",
  ],

  // Hashing
  'Hash function design principles': [
    'Good hash function: 1) Fast to compute, 2) Uniform distribution (minimize clustering), 3) Deterministic (same input always gives same hash). Balance speed and distribution - both matter!',
    'For strings, polynomial rolling hash works well: hash = s[0]*31^(n-1) + s[1]*31^(n-2) + ... + s[n-1]. Why 31? Prime number, small enough to be fast, large enough to reduce collisions.',
    'Avoid: hash functions that only use first/last characters (poor distribution), complex crypto hashes for hash tables (too slow), even multipliers in polynomial hashes (patterns lead to collisions).',
    'Modern approaches: use a prime or odd multiplier, incorporate all input data, use bit shifting for speed. Java String.hashCode() uses 31 as multiplier - battle-tested and fast!',
    'For hash tables, prioritize speed and distribution. For cryptography, prioritize collision resistance and avalanche effect (small input change → large hash change). Different goals!',
  ],

  'Collision resolution - chaining vs open addressing': [
    'Chaining: each bucket has a linked list of entries. Simple, handles high load factors well, deletion is easy. But requires extra memory for pointers and can have poor cache locality. Open addressing: probe for next open slot. Better cache locality, less memory, but clustering can occur and deletion is tricky.',
    'Chaining pros: simple, load factor can exceed 1, insert/delete straightforward. Cons: extra memory, poor cache performance. Open addressing pros: cache-friendly, no pointers. Cons: complex deletion, performance degrades at high load factors.',
    'Use chaining when: deletions are common, load factor might be high, simplicity matters. Use open addressing when: cache performance matters, memory is tight, load factor stays reasonable (<0.7).',
    'Open addressing strategies: linear probing (check next slot), quadratic probing (check i² slots away), double hashing (use second hash function for probing). Each has tradeoffs with clustering vs complexity.',
    'In practice: chaining is more common in teaching and libraries (simpler). Open addressing can be faster with good load factor management. Python dicts use open addressing. Java HashMap uses chaining (well, tree buckets for large chains).',
  ],

  // Dynamic Programming
  'DP vs greedy algorithms - identifying approach': [
    "Use greedy when: local optimal choice leads to global optimum (like Dijkstra, Huffman coding). Use DP when: problem has overlapping subproblems and optimal substructure, but greedy doesn't work (like 0/1 knapsack, edit distance).",
    "Test for greedy: can you make locally optimal choices without reconsidering? If yes, try greedy. If local optimum doesn't guarantee global optimum, use DP. Example: coin change with arbitrary denominations needs DP, but with standard coins (1,5,10,25) greedy works.",
    'Characteristics of DP problems: "find minimum/maximum", "count number of ways", "is it possible". With overlapping subproblems (solving same subproblem multiple times). And optimal substructure (optimal solution contains optimal solutions to subproblems).',
    "Greedy is O(n) or O(n log n) usually. DP is often O(n²) or O(n³). So if greedy works, it's better! But many problems don't have greedy solutions - test with counterexamples.",
    "Strategy: try greedy first (it's simpler). Find a counterexample where greedy fails. If you find one, use DP. Classic greedy-fails example: activity selection with weights (greedy by earliest finish doesn't work, need DP).",
  ],

  'Memoization vs tabulation in DP': [
    'Memoization (top-down): write recursive solution, cache results in a memo table. Only computes subproblems you actually need. Tabulation (bottom-up): iteratively fill a table from base cases up. Computes all subproblems.',
    'Memoization pros: intuitive (natural recursion), only solves needed subproblems. Cons: recursion overhead, stack space. Tabulation pros: no recursion overhead, better cache locality, easier to optimize space. Cons: might compute unnecessary subproblems.',
    'I prefer memoization for learning (easier to think recursively). Tabulation for production (faster, no stack overflow risk). Both have same time complexity, but tabulation is often faster in practice.',
    "When to use which: Memoization if you don't know which subproblems are needed (sparse search space). Tabulation if you know you need most/all subproblems (dense search space). Both work for most problems though!",
    'Code-wise: memoization is usually fewer lines (recursive + dictionary). Tabulation is more lines (nested loops + table) but more explicit about order of computation.',
  ],

  'Identifying overlapping subproblems': [
    'Draw the recursion tree! If you see the same inputs appearing multiple times, you have overlapping subproblems. Classic example: Fibonacci - fib(3) is computed multiple times in fib(5).',
    "Overlapping subproblems means you're solving the same thing repeatedly. DP caches these. If each subproblem is solved only once (like in divide-and-conquer merge sort), DP doesn't help!",
    "Compare: merge sort has no overlap (each subarray is split exactly once). Fibonacci has massive overlap (fib(3) computed exponentially many times). When there's overlap, cache it with DP!",
    "Test: if naive recursion has exponential time but you think it should be polynomial, there's likely overlap. Add memoization and see if it becomes polynomial. If yes, overlapping subproblems confirmed!",
    "Not all recursive problems have overlap! Tree traversal, merge sort, quicksort don't have overlap. Fibonacci, knapsack, edit distance do. Overlap + optimal substructure = DP candidate.",
  ],

  // NP & Backtracking
  'P vs NP - practical implications': [
    'NP-complete means no known polynomial-time algorithm. Practically: for small inputs, you can brute force or use backtracking. For large inputs, use approximation algorithms (good enough, not optimal) or heuristics.',
    "Don't give up! Use: 1) Approximation algorithms (like 2-approximation for vertex cover), 2) Heuristics (like genetic algorithms), 3) Special case solutions (if your input has special structure), 4) Exponential algorithms with pruning for small n.",
    'Real-world approach: if n is small (< 20), brute force or backtracking is fine. If n is large, use approximations. Many NP-complete problems have good approximation algorithms with guarantees like "within 2x of optimal".',
    'Examples: TSP is NP-complete, but Christofides algorithm gives 1.5-approximation. Vertex cover has 2-approximation. SAT solvers work well in practice using smart heuristics even though SAT is NP-complete.',
    "The key insight: NP-complete doesn't mean impossible, just that we don't know a fast exact algorithm. Approximate solutions or small-n solutions are very useful in practice!",
  ],

  'NP-hard vs NP-complete clarification': [
    'NP-complete: in NP (verifiable in polynomial time) AND NP-hard (at least as hard as hardest NP problems). NP-hard: at least as hard as NP-complete, but might not be in NP (might not even be decidable!). All NP-complete problems are NP-hard, but not vice versa.',
    "Think of it: NP-complete = hardest problems in NP. NP-hard = at least that hard, possibly harder. Example: Halting Problem is NP-hard but not NP-complete (it's undecidable, not even in NP).",
    'Practically: NP-complete problems are hard but you can verify solutions quickly. NP-hard problems might be even worse - you might not even be able to verify solutions quickly. Focus on NP-complete for algorithm class.',
    'Why the distinction matters: NP-complete problems have structure (they\'re all related by polynomial reductions). NP-hard just means "hard" - could be optimization version of NP-complete, or something even more intractable.',
  ],

  'Backtracking vs brute force': [
    "Brute force: try all possibilities, no pruning. Backtracking: try possibilities, but prune branches that can't lead to solution. Backtracking is smarter brute force with early termination!",
    "Use backtracking when: you can detect partial solutions that won't work (prune them), you need to explore a tree of possibilities (like N-queens, sudoku), search space is huge but you can cut it down with constraints.",
    'Example: N-queens. Brute force tries all n^n possible board states. Backtracking places one queen per row, checks conflicts, backtracks if conflict. Prunes invalid branches early. Still exponential, but much faster in practice.',
    'Backtracking is a specific strategy: build solution incrementally, maintain constraints, abandon partial solutions that violate constraints. Brute force has no such intelligence - just try everything.',
    'Code structure: backtracking is recursive with constraint checking and early returns. Brute force is typically nested loops trying all combinations. Backtracking can be exponentially faster despite same worst-case complexity.',
    'When to use: constraint satisfaction problems (sudoku, graph coloring, N-queens), combinatorial search (subsets, permutations with constraints), puzzle solving. Anywhere you can prune the search space!',
  ],

  // ============================================================================
  // SSW590 - DevOps (20 questions)
  // ============================================================================

  'Kanban WIP limits - how to determine the right number': [
    "Start with team size or slightly less. For a 5-person team, try WIP of 4-5. Monitor cycle time and throughput. If work is flowing smoothly, you're good. If there's a lot of waiting or context switching, adjust.",
    "Trial and error is the way! Start conservative (low WIP), then gradually increase until you see work start to stack up or cycle time increase. That's your limit. The goal is smooth flow, not maximum WIP.",
    "The theory: WIP limit should match your bottleneck capacity. If testing is your bottleneck and you have 2 testers, don't have more than 2-3 items in test at once. Otherwise they queue up.",
    "Use Little's Law: Average WIP = Throughput × Cycle Time. Measure your cycle time and desired throughput, solve for WIP. But honestly, starting with team size and adjusting empirically works better in practice!",
  ],

  'Kanban vs Scrum - key differences': [
    'Scrum: timeboxed sprints, defined roles (SM, PO, team), prescribed ceremonies (daily standup, retro, etc.), commitment-based. Kanban: continuous flow, no prescribed roles, no timeboxes, limit WIP. Scrum is more structured, Kanban is more flexible.',
    "Choose Scrum when: you want structure, team is new to agile, stakeholders like sprint commitments. Choose Kanban when: work is unpredictable (support tickets), continuous delivery, team wants flexibility, you're already doing Scrum and want to improve flow.",
    'Kanban focuses on flow and cycle time. Scrum focuses on velocity and sprint goals. Both are agile, but different approaches. You can even combine them (Scrumban)!',
    'Key Kanban principles: visualize work, limit WIP, manage flow, make policies explicit, improve collaboratively. Key Scrum principles: timeboxing, cross-functional teams, inspect and adapt. Different emphases!',
  ],

  'Kanban metrics - cycle time vs lead time': [
    "Lead time: when customer requests work → when work is delivered. Cycle time: when team starts work → when work is delivered. Lead time includes waiting time before work starts. Cycle time doesn't.",
    'From customer perspective, lead time matters (how long until they get value?). From team perspective, cycle time matters (how efficient is our process?). Track both!',
    'To optimize: reduce cycle time by improving team efficiency. Reduce lead time by minimizing queue time (backlog prioritization, smaller batches). Different levers for improvement.',
    'In Kanban, focus on cycle time for process improvement. It tells you how long work takes once started. Use it to identify bottlenecks. Lead time helps set customer expectations.',
  ],

  // Docker
  'Dockerfile CMD vs ENTRYPOINT': [
    'CMD: default command, can be overridden easily (docker run image newcommand). ENTRYPOINT: main executable, not easily overridden. Use ENTRYPOINT for the main process, CMD for default arguments that users might change.',
    'Best practice: ENTRYPOINT for executable, CMD for default args. Example: ENTRYPOINT ["python"] and CMD ["app.py"]. Users can run docker run image script.py to run different script, but it always uses python.',
    'CMD gets replaced entirely if you pass args to docker run. ENTRYPOINT runs no matter what, and docker run args get passed to it. You can combine them: ENTRYPOINT + CMD gives you executable with overrideable default args.',
    'I think of it: ENTRYPOINT = what to run (the program), CMD = how to run it (the arguments). For simple cases, just CMD is fine. For containers meant to run a specific tool, ENTRYPOINT is better.',
  ],

  'Docker image layers - optimizing build times': [
    'Each instruction creates a layer. Docker caches layers. If nothing changed, it reuses cache. So: put things that change rarely (OS, dependencies) early in Dockerfile, things that change often (your code) late. This maximizes cache hits!',
    "Order: FROM → system packages → language runtime → dependencies (package.json, requirements.txt) → COPY code → CMD. This way, code changes don't invalidate dependency cache.",
    "Example for Node: FROM, RUN apt-get, COPY package.json, RUN npm install, COPY . (rest of code), CMD. Now code changes don't trigger npm install rebuild!",
    'Also: combine RUN commands with && to reduce layers. Each RUN is a layer, so RUN apt-get update && apt-get install -y package is better than two separate RUNs. Fewer layers = smaller image.',
    'Use .dockerignore to exclude files from COPY context. Speeds up build and reduces layer size. Exclude node_modules, .git, test files, etc.',
  ],

  'Docker networking - bridge vs host mode': [
    "Bridge (default): container gets its own network namespace and IP. Isolated from host. Access via port mapping (-p 8080:80). Secure and flexible. Host: container shares host's network stack. No isolation, no port mapping needed.",
    'Use bridge for: most cases, security (isolation), multiple containers on same host. Use host for: maximum network performance, need to bind to all host IPs, legacy apps that need host network access.',
    'Bridge networking is safer - containers are isolated. Host networking removes that layer, so container can access everything host can. Performance difference is minimal unless you have very high network throughput.',
    'Example: bridge lets you run multiple web servers (each container on port 80 inside) mapped to different host ports (8080, 8081). Host mode would conflict - only one container can bind port 80.',
    'For Docker Compose, bridge is default and containers can reach each other by service name. Super convenient! Host mode is rarely needed unless you have specific network requirements.',
  ],

  'Docker volumes vs bind mounts': [
    'Volumes: managed by Docker, stored in Docker area (/var/lib/docker/volumes). Portable, work on all platforms, better for production. Bind mounts: mount a specific host path into container. Good for development.',
    'Use volumes for: production, persisting database data, sharing data between containers, when you want Docker to manage storage. Use bind mounts for: development (mount source code), accessing specific host files.',
    'Bind mounts are host-dependent (path might not exist on different machines). Volumes are portable. But bind mounts are easier for dev - just mount your code directory and changes reflect immediately!',
    'I use bind mounts for development (docker run -v $(pwd):/app for live code updates). Volumes for production databases and persistent data. Best of both worlds!',
    "Syntax: -v /host/path:/container/path is bind mount. -v volumename:/container/path is named volume. Docker creates volume if it doesn't exist.",
  ],

  // Cloud
  'IaaS vs PaaS vs SaaS - practical examples': [
    'IaaS (Infrastructure): AWS EC2, you manage OS, runtime, app. Rent VMs. PaaS (Platform): Heroku, AWS Elastic Beanstalk, you manage app, platform manages runtime and OS. SaaS (Software): Gmail, Salesforce, you just use the app, everything is managed.',
    'Think of pizza analogy: made at home (traditional) = you do everything. IaaS = you get kitchen and ingredients, you cook. PaaS = you get pre-made dough, you add toppings and bake. SaaS = delivery, you just eat.',
    'IaaS examples: AWS EC2, Google Compute Engine, Azure VMs. PaaS examples: Heroku, Google App Engine, AWS Lambda. SaaS examples: Office 365, Dropbox, Slack. Each level abstracts more.',
    "Choose IaaS for: full control, custom OS/runtime needs. PaaS for: faster deployment, don't want to manage servers. SaaS for: standard business apps, no dev needed. It's about control vs convenience.",
  ],

  'Cloud deployment strategies - blue-green vs canary': [
    'Blue-green: run two identical environments (blue=current, green=new). Deploy to green, test, switch traffic. Instant rollback if issues - just switch back to blue. Canary: gradually route % of traffic to new version. Monitor, increase % if good.',
    'Blue-green pros: instant rollback, fully test new version before switching, zero downtime. Cons: needs 2x resources, all-or-nothing switch. Canary pros: gradual rollout, less risk, detect issues with small % of users. Cons: more complex, need traffic routing.',
    'Use blue-green for: critical apps where you need instant rollback, when you can afford double resources, when you want to fully test before switching. Use canary for: reducing risk, large user bases, when you can monitor metrics.',
    'I prefer canary for production - catch issues affecting 5% of users rather than 100%. But blue-green is simpler to implement if you have the resources. Both beat rolling deployments for safety!',
    'Tools: AWS has both (Elastic Beanstalk for blue-green, ALB for canary). Kubernetes has canary built-in with Deployments. Netflix uses canary extensively. Good stuff!',
  ],

  // Containers vs VMs
  'Containers vs VMs - performance differences': [
    'Containers share the host OS kernel - no need to boot an OS. VMs include full OS, need to boot. Containers start in seconds, VMs take minutes. Containers use less memory (no full OS copy), VMs are more isolated but heavier.',
    'The architecture: VMs have hypervisor → guest OS → app. Containers have host OS → container runtime → app. Fewer layers = faster and lighter!',
    'Startup time: container = seconds (just start process). VM = minutes (boot OS, load services). For microservices and scaling, container speed is crucial.',
    'Resource usage: container shares kernel, isolated with namespaces and cgroups. Low overhead. VM has full OS copy, hardware virtualization. More overhead, but stronger isolation.',
  ],

  'When to use VMs instead of containers': [
    'Use VMs when: you need full isolation (security-critical), you need different OS than host (run Windows on Linux host), you need to emulate hardware, you have legacy apps that need full OS. Otherwise, containers are usually better.',
    'VMs provide stronger isolation - full hardware virtualization. Containers share kernel, so a kernel exploit could affect host. For multi-tenant or untrusted code, VMs are safer.',
    "If you need to run different OSes (Linux and Windows), VMs are necessary. Containers must match host OS kernel. You can't run Windows container on Linux host (without WSL2 which is... a VM).",
    'Real-world: use containers for microservices, scalability, dev environments. Use VMs for: legacy apps, Windows apps on Linux hosts, strong isolation needs, or when you need full OS control.',
    'Trend: containers for apps, VMs for container hosts! Run containers inside VMs to get both: isolation of VMs + speed of containers. AWS Fargate, GKE do this.',
  ],

  // Phoenix Project
  'Phoenix Project - The Three Ways explained': [
    'First Way: Systems Thinking (optimize flow). Second Way: Amplify Feedback Loops (learn fast). Third Way: Culture of Experimentation (continuous improvement and risk-taking). Together they enable DevOps transformation.',
    'First Way example: automate deployments to reduce handoffs and waiting. Value stream mapping to identify bottlenecks. Second Way example: monitoring and alerts for fast feedback. Third Way example: game days, blameless postmortems.',
    "The book shows: First Way = make work flow from dev to ops to customer. Second Way = create feedback so problems are detected early. Third Way = culture where it's safe to try new things. All three needed!",
    'Practical: First Way focuses on flow and bottleneck elimination. Second Way focuses on telemetry and learning from failures. Third Way focuses on experimentation and resilience. Each builds on the previous one.',
    'Think of it as: First Way = efficiency (do it fast). Second Way = quality (do it right). Third Way = innovation (do it better). DevOps needs all three!',
  ],

  'Four types of work from Phoenix Project': [
    "Business Projects: new features, revenue-generating work. Internal Projects: infra, tools, refactoring. Changes: small deployments and updates. Unplanned Work: firefighting, outages, urgent fixes. Unplanned work is the killer - it's caused by other work done poorly!",
    'Track them separately! Business projects = your planned features. Internal projects = tech debt, tooling. Changes = routine updates. Unplanned = interruptions. Measure % of time on each. High unplanned work? You have problems.',
    "The insight: unplanned work is expensive and disruptive. It's caused by lack of automation, poor quality, tech debt. Reduce unplanned work by investing in internal projects (automation, monitoring, refactoring).",
    "I categorize my tickets by these four types. Helps show why we can't deliver more features - we're spending 40% of time on unplanned work! Makes the case for investing in internal projects and reducing tech debt.",
  ],

  'Phoenix Project - applying to small teams': [
    'The principles apply even more to small teams! You feel the pain of inefficiency directly. Focus on: automate deployments (First Way), fast feedback (monitoring/tests, Second Way), learn from mistakes (blameless retros, Third Way).',
    'Small teams can move faster - less coordination overhead. Use that! Implement CI/CD (First Way), add monitoring and alerts (Second Way), do retros and experiments (Third Way). You can transform in weeks, not months.',
    "Don't need elaborate tools. GitHub Actions for CI/CD, Datadog/Prometheus for monitoring, simple retros. Principles matter more than specific tools. Start small, iterate.",
    "The book's WIP limits, flow concepts, constraint theory - all apply. Small team means you hit bottlenecks faster. Identify your constraint (is it dev? test? deploy?) and optimize it. Theory of Constraints works at any scale!",
    'Small team advantage: everyone wears multiple hats, so dev and ops are already collaborating. Just formalize it with practices like on-call rotations, shared responsibility, blameless postmortems.',
  ],

  // The Three Ways (detailed)
  'First Way - systems thinking in practice': [
    'Focus on end-to-end flow from dev to production. Value stream mapping: identify all steps, handoffs, wait times. Eliminate handoffs and waiting. Automate. Example: CI/CD pipeline reduces handoffs from devs to ops.',
    'Daily practice: never pass defects downstream (fail fast), limit WIP, reduce batch sizes (deploy small changes frequently), eliminate waste (waiting, handoffs, context switches). Make work flow!',
    'Measure: lead time (idea to production), deployment frequency, change fail rate. These metrics tell you if flow is improving. Goal: fast, smooth flow of value to customer.',
    'Practical changes: automate build/test/deploy, create deployment pipelines, remove manual approval gates, use feature flags for safe deploys. Each reduces friction and speeds flow.',
  ],

  'Second Way - amplifying feedback loops': [
    'Create fast feedback: automated tests (immediate), monitoring (minutes to hours), user metrics (hours to days). The faster you detect problems, the cheaper they are to fix.',
    'Practices: comprehensive monitoring, alerting, telemetry, log aggregation. Also: peer review, pair programming, TDD. All create feedback loops at different timescales.',
    'The goal: see problems as they occur, not weeks later. Shift left - move testing and quality checks earlier in the process. Feedback loops should be fast and actionable.',
    'Specific examples: test failures in seconds (CI), performance degradation in minutes (APM), user errors in hours (analytics), customer feedback in days (NPS). Layer feedback loops at multiple timescales!',
  ],

  'Third Way - culture of experimentation': [
    'Create psychological safety for taking risks and learning from failures. Practices: blameless postmortems, game days (chaos engineering), allocate time for learning, celebrate learning from failure.',
    "When teams fear failure, they don't innovate or take smart risks. Your job: make it safe to fail. Blameless postmortems focus on systems, not people. Game days practice failure response in safe environment.",
    "Also: inject time for experimentation (Google's 20% time concept), create internal tech talks, encourage contributing to open source, dedicate time to learning new tools. Build learning into the culture.",
    'Overcoming risk-aversion: start with small experiments (A/B tests, feature flags), simulate failures (game days, chaos engineering), share learnings widely (postmortems, demos). Show that controlled experimentation is valuable, not risky!',
  ],

  // Toyota Kata
  'Toyota Kata - improvement kata vs coaching kata': [
    'Improvement Kata: a pattern for continuous improvement. Define target condition, understand current condition, run PDCA experiments toward target. Coaching Kata: a pattern for teaching improvement kata. Manager asks 5 questions to guide learner.',
    "They work together: improvement kata is what you do, coaching kata is how you teach it. The 5 coaching questions guide the learner through improvement kata: What's the target? What's current? What obstacles? What's your next step? When can we see?",
    "The brilliance: coaching kata ensures improvement kata spreads through the org. Managers don't solve problems, they coach others to solve problems systematically using improvement kata.",
    "I use this with my team: I don't give answers, I ask the 5 questions. Forces them to think scientifically about improvement. Over time, they internalize improvement kata and don't need my coaching.",
  ],

  'PDCA cycle in Toyota Kata': [
    'PDCA (Plan-Do-Check-Act) is embedded in improvement kata. Each experiment toward target condition is one PDCA cycle. Plan: hypothesis and experiment. Do: run experiment. Check: what happened? Act: adjust based on learning.',
    "Improvement kata is a structured way to apply PDCA iteratively. You run many small PDCA cycles, each moving you closer to target condition. It's not one big PDCA, but continuous small experiments.",
    "PDCA is the scientific method for improvement. Improvement kata provides the structure: where are we going (target), where are we now, what's in the way, what's the next experiment (PDCA). They complement each other.",
    'Think of it: improvement kata is the overall framework. PDCA is the engine for each step. You iterate PDCA cycles within the improvement kata structure until you reach your target condition.',
  ],

  'Applying Toyota Kata to DevOps': [
    'Example target condition: deploy to production in under 10 minutes with <1% rollback rate. Current: 2 hour deploy, 10% rollback. Obstacles: manual steps, poor test coverage, big batch sizes. Next step: automate one manual step.',
    'Use improvement kata for: reducing deployment time, improving test coverage, decreasing incident MTTR, increasing deployment frequency. Define measurable target, run experiments, iterate.',
    'The power: it breaks big goals ("become DevOps!") into small experiments. You don\'t need to know the whole path, just the next step. Run experiment, learn, adjust, repeat.',
    "I literally use the coaching questions in retros: What's our target state for next sprint? What's our current state? What's blocking us? What will we try next? When will we check results? Works great!",
    'CI/CD is perfect for this: each improvement (parallelize tests, cache dependencies, automate deployment step) is an experiment. Measure before/after. Iterate toward target condition.',
  ],

  // ============================================================================
  // CS546 - Web Programming (20 questions)
  // ============================================================================

  'Semantic HTML - when to use section vs div': [
    "Use semantic tags (<section>, <article>, <nav>, <header>) when the element has meaning/purpose. Use <div> when it's purely for styling/layout. Semantic tags help screen readers, SEO, and code readability.",
    '<section> is a thematic grouping of content, usually with a heading. <article> is self-contained content (blog post, comment). <div> is generic container with no semantic meaning. <nav> for navigation, <header> for header. Be semantic!',
    'Rule of thumb: if you can describe what the element represents (navigation, article, header), use semantic tag. If it\'s just "container for styling", use div. Screen readers use semantic tags to help users navigate!',
    'Example: blog post structure → <article> for post, <header> for title/author, <section> for each part, <div> for styling wrappers. Semantic where meaningful, divs for layout.',
  ],

  'HTML forms - GET vs POST method': [
    'GET: parameters in URL, visible, bookmarkable, cached, length-limited. Use for retrieving data (search, filters). POST: parameters in body, not visible in URL, not cached, no length limit. Use for submitting data (login, creating resources).',
    "Security: never use GET for sensitive data (passwords, personal info) - it's visible in URL and browser history! POST is more secure for sensitive data. For idempotent reads, GET is fine.",
    'REST semantics: GET should be safe and idempotent (multiple calls = same result). POST can change server state. GET for "read", POST for "write". There\'s also PUT, DELETE, but forms only support GET/POST.',
    "Practical: search form → GET (URL can be bookmarked). Login form → POST (password shouldn't be in URL). Contact form → POST (submitting data). Newsletter signup → POST (creating subscription).",
    'GET parameters are limited by URL length (~2000 chars in practice). POST has no limit (well, server-configured limit). For large data or file uploads, POST is required.',
  ],

  // CSS
  'CSS Flexbox vs Grid - when to use which': [
    'Flexbox: one-dimensional layout (row or column). Great for: navigation bars, centering, spacing items in a line. Grid: two-dimensional layout (rows and columns). Great for: page layouts, card grids, complex layouts.',
    'Use Flexbox when: laying out items in a single direction, distributing space, aligning items. Use Grid when: creating structured 2D layouts, spanning rows/columns, complex positioning. You can combine them!',
    'I use Grid for overall page structure (header, sidebar, main, footer), Flexbox for components within those areas (nav items, button groups, card content). Grid is the skeleton, Flexbox is the muscles.',
    'Flexbox is simpler for basic layouts. Grid is more powerful for complex layouts. Start with Flexbox, use Grid when you need 2D control. Both are better than floats and positioning for layout!',
    'Example: navbar → Flexbox (items in a row). Photo gallery grid → Grid (rows and columns). Card with image, title, description → Flexbox (vertical stack). Complex dashboard → Grid for overall, Flexbox for components.',
  ],

  'CSS specificity calculation': [
    'Specificity hierarchy: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1). Count each type, compare left to right.',
    'Example: #nav .link (ID + class = 110) beats .header .link (class + class = 20). div.link (element + class = 11) beats div a (element + element = 2).',
    'If specificity is equal, last rule wins (cascade). Use inspector to see which rule is applied and why. Avoid !important - it breaks specificity and makes debugging hard!',
    'To debug: inspect element, see which styles are crossed out (overridden). The applied style has higher specificity or comes later. Add/remove classes to see specificity changes.',
    'Best practice: keep specificity low and consistent. Use classes for styling, avoid IDs for CSS. Deep nesting increases specificity and makes overriding hard. Flat class-based styling is maintainable.',
  ],

  'CSS positioning - relative vs absolute': [
    'Relative: positioned relative to its normal position, element still occupies space. Absolute: positioned relative to nearest positioned ancestor, removed from document flow. Fixed: positioned relative to viewport. Sticky: hybrid of relative and fixed.',
    "Use relative when: you want to shift element slightly without affecting layout, or as container for absolute children. Use absolute when: tooltips, dropdowns, overlays - things that shouldn't affect document flow.",
    "Key difference: relative element still takes up space in document. Absolute element is removed from flow, doesn't affect other elements. For absolute to work relative to parent, parent needs position: relative!",
    'Common pattern: parent has position: relative (but no offset), child has position: absolute + top/right/bottom/left. Child is positioned relative to parent, not the whole page. Very useful for overlays!',
    'Fixed is like absolute but relative to viewport - stays in place on scroll. Sticky is relative until you scroll, then becomes fixed. Each has use cases: relative for nudging, absolute for overlays, fixed for nav, sticky for headers.',
  ],

  // JavaScript
  'JavaScript var vs let vs const': [
    "var: function-scoped, hoisted, can be redeclared. let: block-scoped, not hoisted (TDZ), can't be redeclared in same scope. const: like let but can't be reassigned. Use const by default, let when you need to reassign, avoid var!",
    'Block scope (let/const) is safer - variable only exists in its block. Function scope (var) can cause bugs with hoisting and unexpected scope. Modern code should use let/const exclusively.',
    "const doesn't mean immutable! const obj = {} - you can't reassign obj, but you can modify obj.prop = \"value\". For primitives, const is immutable. For objects/arrays, const means can't reassign reference.",
    'I follow this rule: const by default (signals "doesn\'t change"), let when I need to reassign (loop counters, accumulators), never var (legacy). Const makes code easier to reason about.',
    'Hoisting: var declarations are hoisted to top of function (but not initialization). let/const have TDZ (temporal dead zone) - accessing before declaration throws error. Another reason to prefer let/const!',
  ],

  'JavaScript closures - simple explanation': [
    'A closure is when an inner function remembers variables from its outer function, even after outer function has returned. Use case: private variables, factory functions, callbacks that need to remember state.',
    'Example: function counter() { let count = 0; return () => ++count; }. The returned function "closes over" count variable. Each call to the function increments the same count. count is private!',
    "Think of it as: functions remember their birth environment. Even if the outer function is gone, the inner function still has access to outer variables. That's the closure.",
    "Practical uses: event handlers that need to remember data, module pattern for private variables, currying and partial application. Any time you return a function that uses outer variables, that's a closure!",
    'Common gotcha: closures in loops. for(var i=0; i<5; i++) { setTimeout(() => console.log(i), 100); } prints 5 five times because closure captures i reference, not value. Use let or IIFE to fix.',
  ],

  'JavaScript this keyword behavior': [
    'In regular functions, "this" depends on how function is called. In arrow functions, "this" is lexically bound (inherits from surrounding scope). Arrow functions don\'t have their own "this"!',
    'Regular function: obj.method() → this is obj. method() (without obj) → this is undefined (strict mode) or global. Arrow function: this is whatever it was where the function was defined.',
    'Your bug is probably: using arrow function as method, or using regular function as callback. For methods, use regular function. For callbacks that need to access outer "this", use arrow function.',
    'Example: class with event handler. onClick={() => this.handleClick()} works (arrow function captures class instance). onClick={this.handleClick} breaks ("this" is undefined when called). Either use arrow or bind!',
    'Rule of thumb: methods → regular function (this = object). Callbacks → arrow function (this = outer scope). Or just use arrow functions everywhere and bind "this" explicitly when needed.',
  ],

  // ES6 Modules
  'ES6 import vs require': [
    "import/export is ES6 modules (static, compile-time). require/module.exports is CommonJS (dynamic, runtime). In browser and modern Node, use ES6. Legacy Node uses CommonJS. Can't mix them without transpiler!",
    'ES6: import {foo} from "./module" and export const foo = .... CommonJS: const {foo} = require("./module") and module.exports = {foo}. Similar syntax, different systems.',
    'ES6 advantages: static analysis (tree-shaking, better IDE support), named and default exports, import is hoisted. CommonJS advantage: can require() conditionally at runtime.',
    'Node.js: use .mjs extension or "type": "module" in package.json for ES6. Default is CommonJS. Modern Node (14+) supports both, but you need to choose one per package.',
    "Don't mix! Pick one system. For new projects, use ES6. For legacy Node projects, CommonJS is fine. You can use ES6 in frontend (Webpack/Babel transpile to CommonJS if needed).",
  ],

  'Default export vs named exports': [
    'Named exports: export {foo, bar}. Import with same names: import {foo, bar}. Multiple exports per file. Default export: export default foo. Import with any name: import myFoo. One default per file.',
    "Use named exports for: multiple utilities in one file, clearer imports (you know what you're getting). Use default export for: main export of a file (like a React component), classes, single responsibility modules.",
    'Tradeoff: default exports allow importing with any name (flexible but can be inconsistent). Named exports enforce consistent names (better for refactoring and IDE support).',
    'I prefer named exports - easier to search codebase, better autocomplete, consistent naming. But React community uses default for components. Choose what works for your team!',
    'You can have both! export {foo, bar} and export default baz. Import with: import baz, {foo, bar} from "./module". Default comes first.',
  ],

  // Error Handling
  'Node.js error handling - try-catch vs .catch()': [
    "try-catch for synchronous code and await. .catch() for promises without await. They're equivalent for async/await: try {await promise} catch(e) {} is same as promise.catch(e => {}).",
    "With async/await, use try-catch (looks like sync code, easier to read). With promise chains, use .catch(). Don't mix - pick one style per function.",
    "try-catch only catches synchronous errors and errors from awaited promises. It doesn't catch errors from un-awaited promises! For those, you need .catch() or unhandled rejection handler.",
    "Best practice: async function with try-catch wrapping await calls. Clean, readable, easy to handle errors. Or promise.catch() if you're doing promise chaining. Consistent style matters!",
  ],

  'Handling errors in Express middleware': [
    'For synchronous errors, throw or call next(err). For async errors, catch and call next(err). Express catches synchronous errors automatically, but not async errors (unless you use express-async-errors or wrap in try-catch).',
    'Pattern: async (req, res, next) => { try { await doSomething(); res.send() } catch(err) { next(err) } }. Or install express-async-errors package to auto-catch async errors.',
    'Error handling middleware: app.use((err, req, res, next) => { res.status(500).send(err.message) }). Note: four parameters! Express detects error middleware by parameter count.',
    "Don't throw in async middleware without catching - it causes unhandled rejection! Either use try-catch + next(err), or use a wrapper library. This is a common source of crashes.",
    'I use express-async-errors package. It wraps async route handlers automatically and calls next(err) on errors. Makes code cleaner. Otherwise, every async route needs try-catch boilerplate.',
  ],

  // Express
  'Express middleware execution order': [
    'Express executes middleware in the order you define them with app.use() and app.METHOD(). First defined, first executed. Request flows through middleware chain until one sends a response or calls next().',
    'Common order: body parser → CORS → authentication → routes → error handler. Parsers go first (so req.body is available), error handler last (so it catches errors from all previous middleware).',
    "If you don't call next(), the request hangs! Each middleware must either send a response (res.send) or call next() to pass to next middleware. This is how the chain works.",
    'Specific routes before general routes: app.get("/users/me") before app.get("/users/:id"). Otherwise ":id" matches "me" and the first route never runs. Order matters!',
    'Error-handling middleware (4 params) goes last, after routes. Normal middleware (3 params) goes before routes. app.use("*") catch-all goes at the very end for 404s.',
  ],

  'Express app.use() vs app.get()': [
    'app.use(): applies to all HTTP methods and routes (or specific path if provided). app.get(): only GET requests to specific route. Similar methods: app.post, app.put, app.delete for other HTTP methods.',
    'app.use() is for middleware that runs on all requests (logging, parsing, CORS). app.get/post/etc() are for route handlers that respond to specific requests.',
    'Examples: app.use(bodyParser.json()) runs on all requests. app.use("/api", apiRouter) mounts router on /api path. app.get("/users", handler) only handles GET /users.',
    'You can use app.use() with a path: app.use("/api", middleware) runs middleware only for routes starting with /api. Still runs for all methods (GET, POST, etc) on that path.',
    'Think of it: app.use() for horizontal concerns (logging, parsing, auth), app.METHOD() for specific route handlers. They complement each other in building an Express app.',
  ],

  // Async/Await
  'Async/await vs Promises - which to use': [
    "Async/await is syntax sugar over promises - they're equivalent! Async/await is generally more readable (looks like sync code), especially for sequential async operations. Use async/await for new code.",
    'Use .then() chains for: simple single promise, functional composition. Use async/await for: complex async logic, multiple sequential awaits, try-catch error handling, anything that benefits from looking synchronous.',
    'Both work! But async/await is easier to read and debug. Compare: fetch().then(res => res.json()).then(data => ...) vs const res = await fetch(); const data = await res.json(). Second is clearer!',
    'You can mix them: async functions return promises, so you can await a promise-returning function or .then() it. But pick one style per function for consistency.',
    "Async/await doesn't make code faster - it's just syntax. The benefit is readability and maintainability. For simple cases, both are fine. For complex async logic, async/await wins.",
  ],

  'Error handling with async/await': [
    'Wrap await in try-catch! try { const data = await fetchData(); } catch(err) { handle error }. Without try-catch, unhandled errors crash the app.',
    "You don't need try-catch for every await if you want errors to propagate up. Only catch where you want to handle errors. Uncaught async errors bubble up to caller (if they await) or become unhandled rejections.",
    'Pattern for Express: async (req, res, next) => { try { await ... } catch(err) { next(err) } }. Catch errors and pass to Express error handler. Or use express-async-errors to avoid boilerplate.',
    'For multiple awaits, one try-catch can wrap all: try { const a = await foo(); const b = await bar(a); } catch(err) { handle }. Catches errors from any await.',
    'Don\'t forget top-level error handlers! In Node: process.on("unhandledRejection", err => ...). In browser: window.addEventListener("unhandledrejection", ...). Catches errors that slip through.',
  ],

  // MongoDB
  'MongoDB findOne vs find': [
    'findOne() returns a single document (object or null). find() returns a cursor (need to iterate or .toArray()). findOne is for "get one", find is for "get multiple".',
    'findOne({_id: id}) returns the document directly. find({_id: id}) returns cursor, need .toArray() to get array with one element. findOne is simpler when you want one result!',
    "Performance: if you only need one result, use findOne. MongoDB stops searching after finding first match. find() can return many results, so it's less efficient if you only need one.",
    'Use findOne for: getting by ID, login (find user by email), getting one specific resource. Use find for: listing items, search results, filtering collections. Match the method to your intent!',
    'With cursor: const cursor = find({}); await cursor.forEach(doc => ...). Or const docs = await find({}).toArray(). With findOne: const doc = await findOne({}). Simpler!',
  ],

  'MongoDB ObjectId vs string ID': [
    "ObjectId: MongoDB's default, auto-generated, 12-byte identifier with timestamp. Unique without coordination, sortable by creation time. String IDs: custom, more readable (like username or slug), but you manage uniqueness.",
    "Use ObjectId for: most cases, it's the default and works great. Use string IDs for: human-readable identifiers (usernames, slugs), when you need specific ID format, when integrating with external systems.",
    'ObjectId benefits: auto-generated, unique, includes timestamp, efficient indexing. String benefits: readable URLs (example.com/post/my-awesome-post vs example.com/post/507f1f77bcf86cd799439011), custom format.',
    'You can have both! _id as ObjectId, slug as string for URLs. Example: findOne({slug: "my-post"}) for public URL, findOne({_id: ObjectId(id)}) for internal references. Best of both worlds!',
    'ObjectId is stored efficiently (12 bytes vs variable for strings). For large collections, this matters. But for most apps, the difference is negligible. Choose based on your URL/API design preferences.',
  ],

  // Authentication
  'Password hashing - bcrypt salt rounds': [
    'Recommended: 10-12 rounds for 2025. Each round doubles the time. 10 rounds ≈ 100ms, 12 rounds ≈ 300ms. Balance security (slow enough to resist brute force) with UX (fast enough for login).',
    "More rounds = more secure (harder to brute force), but slower. 10 is a good default. For high-security apps, 12. Don't go above 15 unless you have special requirements - login will be too slow.",
    'As hardware gets faster, increase rounds. The goal: hashing should take ~100-500ms. Too fast and attackers can try many passwords quickly. Too slow and legit users suffer.',
    "Use bcrypt.hash(password, 10) - second param is rounds. bcrypt auto-generates salt. Don't use bcrypt.hashSync in production (blocks event loop) - use async version!",
    "Security note: 10 rounds was recommended years ago, still acceptable today but 12 is better for new apps. In 5 years, we might recommend 14. It's a moving target based on hardware speed.",
  ],

  'Session-based auth vs JWT': [
    'Session: server stores session data, client gets session ID cookie. Stateful, requires session store (memory/Redis/DB). JWT: client stores token with claims, server validates signature. Stateless.',
    "Session pros: can revoke easily (delete session), smaller cookie (just ID), server controls session data. Cons: needs session store, doesn't scale horizontally easily. JWT pros: stateless (scales easily), works across domains. Cons: can't revoke (token valid until expiry), larger token size.",
    'Security: both can be secure. Session needs httpOnly cookies + CSRF protection. JWT needs secure storage (httpOnly cookie or localStorage with XSS protection) + short expiry + refresh tokens.',
    'Use sessions for: traditional web apps, when you need to revoke, when you have session store. Use JWT for: APIs, microservices, mobile apps, when you need stateless auth across multiple services.',
    'You can combine them! Short-lived JWT + refresh token in httpOnly cookie. Or session-based JWT (server stores JWT). Choose based on your architecture and requirements!',
  ],

  // ============================================================================
  // CS555 - Agile Methods (15 questions)
  // ============================================================================

  'Sprint planning - how to estimate story points': [
    "Use planning poker! Each person estimates independently (Fibonacci: 1,2,3,5,8,13), reveal simultaneously, discuss outliers (why did you say 13 when I said 3?), re-vote until consensus. Discuss, don't argue!",
    'Story points are relative, not absolute. Pick a reference story everyone understands (like "user login" = 5 points). Estimate new stories relative to that. Twice as complex? 10 points. Half as complex? 3 points.',
    "Don't overthink it! If the team is arguing between 5 and 8, just pick one and move on. Estimation is imperfect. Over time, velocity averages out. Spending 30 minutes on one story is waste.",
    'Consider: complexity, uncertainty, effort. Don\'t estimate time directly - story points abstract away individuals\' speed. A 5-point story takes 5 "units of effort" regardless of who does it.',
    "Start with a calibration session: estimate 5-10 stories together, discuss reasoning, build shared understanding. Once team is aligned, estimation gets faster. It's a team skill that improves with practice!",
  ],

  'Velocity calculation and sprint planning': [
    "Velocity = sum of story points completed per sprint. Calculate average over last 3-5 sprints. Use that for planning next sprint capacity. Don't over-commit just because you had one high-velocity sprint!",
    'Conservative planning: use average velocity minus one standard deviation. This accounts for variability and unexpected issues. Better to under-promise and over-deliver than miss sprint goals repeatedly.',
    "Velocity is a planning tool, not a performance metric! Don't use it to compare teams (different point scales) or pressure team to increase velocity (gaming the system). Use it to predict capacity.",
    'If velocity is unstable (varies a lot sprint to sprint), look for causes: changing team size, unclear requirements, too much unplanned work. Stable velocity makes planning easier.',
    "Don't commit to exactly average velocity - leave buffer! 10% buffer for bugs, urgent requests, sick days. If average velocity is 30, plan for 25-27 points. Predictable delivery beats hero sprints.",
  ],

  'Story points vs hours - which to use': [
    "Story points abstract away individual differences in speed. 5 points for junior and senior alike - senior finishes faster, but it's still 5 points of team effort. Hours depend on who does the work.",
    'Points are relative and team-specific - your "5" is different from another team\'s "5". That\'s fine! Points are for your team\'s planning, not cross-team comparison. Hours create false precision.',
    'Story points handle uncertainty better. "This is 5 points" is easier to agree on than "this is exactly 6.5 hours". Points have implicit buffer. Hours feel precise but rarely are.',
    'Use story points for: sprint planning, measuring velocity, stakeholder reporting (in terms of value delivered). Use hours for: task breakdowns within a story, time tracking (if required), individual planning.',
    'The big advantage: story points force focus on value and complexity, not time. Two stories might take same time, but if one is more complex/risky, it gets more points. That reflects reality better than hours!',
  ],

  'User stories - acceptance criteria best practices': [
    'Acceptance criteria should be specific, testable, and define "done". Use Given-When-Then format: Given [context], When [action], Then [outcome]. Clear and unambiguous!',
    'Don\'t specify every edge case in AC - that\'s for test cases. AC defines the happy path and major variations. Example: "User can login with valid credentials" is good. Listing 20 validation rules is too detailed.',
    'Each criterion should be independently testable. Avoid: "System should be fast and user-friendly" (vague, not testable). Better: "Login completes within 2 seconds" and "Login form has clear error messages".',
    "I include: functional requirements (what it does), non-functional if critical (performance, accessibility), and out-of-scope (what it doesn't do). Out-of-scope prevents scope creep!",
    'Review AC in refinement with the team. Developers and QA should agree they understand what "done" means before sprint starts. Unclear AC → rework during sprint → missed commitments.',
  ],

  'Epic vs user story - clear distinction': [
    'Epic: large body of work, too big for one sprint, multiple user stories. Story: small enough to complete in one sprint (1-5 days of work). Epic is the goal, stories are the steps.',
    'Example epic: "User Profile Management". Stories: "User can update profile picture", "User can edit bio", "User can change email". Epic is broken down into stories for sprint planning.',
    "If you can't complete it in a sprint, it's an epic (or needs to be broken down). If it's too small (< 1 point, done in hours), combine it with another story or make it a task.",
    'Epics live in backlog for multiple sprints. Stories are pulled into sprints. Epics provide high-level view, stories provide sprint-level detail. Different zoom levels of the same work!',
    'Some teams use: theme > epic > story > task. Theme is strategic initiative, epic is feature set, story is user-facing functionality, task is implementation step. Hierarchy helps organize complex work.',
  ],

  'Daily standup - what to report': [
    'The three questions: 1) What did I do yesterday toward sprint goal? 2) What will I do today toward sprint goal? 3) What blockers do I have? Keep it focused on sprint goal, not everything you did!',
    'Aim for 1-2 minutes per person. Focus on relevant work. "Yesterday I finished user login, today I\'m starting password reset, no blockers" is perfect. No need for detailed explanations - take those offline.',
    "Common mistake: status report to manager. Wrong! It's team coordination. Help teammates know what you're working on so they can collaborate or help. Not a report-out to leadership.",
    "If you're rambling, you're probably giving too much detail. Hit the key points. If discussion is needed, say \"let's talk after standup\" and continue async. Keep the standup moving!",
    'Too vague: "working on the feature". Too detailed: step-by-step account of debugging. Right level: "implemented login API endpoint, starting frontend integration, need help with CORS issue".',
  ],

  'Dealing with blockers in standup': [
    "Mention the blocker briefly in standup: \"I'm blocked waiting for API keys from ops team\". Don't solve it in standup! After standup, relevant people discuss solution. Respect everyone's time.",
    'Standup should be 15 minutes max. If you spend 10 minutes solving one blocker, you\'re doing it wrong. Standup is for surfacing blockers, not solving them. "Parking lot" technique: write it down, discuss after.',
    "Scrum Master's job: note blockers, help remove them after standup. Not everyone needs to be in the blocker discussion - just relevant people. The rest of the team can get back to work.",
    "If blockers are common, something's wrong with the process. Use retrospectives to address systemic issues: dependency on other teams, unclear requirements, infrastructure problems. Fix root causes, don't just firefight!",
    'Sometimes blockers are really "I need help". That\'s fine! "I\'m stuck on this algorithm" → "Alice, can you pair with me after standup?" Standup helps team members help each other.',
  ],

  'Retrospective formats beyond Start-Stop-Continue': [
    'Try: 1) Mad-Sad-Glad (emotions about sprint), 2) Sailboat (wind=what helped, anchor=what slowed, rocks=risks, island=goal), 3) 4Ls (Liked, Learned, Lacked, Longed for), 4) Timeline (plot events on timeline, discuss peaks/valleys).',
    'I like Sailboat for visual teams. Draw a boat: wind is what helped us, anchor is what slowed us down, rocks ahead are risks, island is our goal. Visual metaphor sparks different conversations!',
    '4Ls is great for learning-focused retros. What did we learn this sprint? What did we lack (resources, info, support)? What do we long for (tools, processes)? Focuses on growth, not blame.',
    'Timeline retro: draw sprint timeline, mark key events (deployment, bug, demo). For each event, put green/red dot (good/bad). Discuss patterns. Great for identifying what went well and when things went wrong.',
    "Rotate formats! Keep retros fresh. The format is a tool to spark conversation. If the team is actively discussing and improving, the format is working. If it's stale, change it up!",
  ],

  'Making retrospective action items stick': [
    "The problem: we identify improvements but don't implement them. Solution: 1) Limit to 1-2 action items per retro (focus!), 2) Assign owner, 3) Make it visible, 4) Review in next retro, 5) Make action items sprint backlog items.",
    'Treat action items as work! Add them to backlog, estimate them, include in sprint planning. If "improve test coverage" is important, it deserves story points and priority. Otherwise it\'s just wishful thinking.',
    "Start next retro by reviewing last retro's action items. Did we do them? Why/why not? This accountability makes team take action items seriously. If we never follow through, stop creating action items!",
    'Keep action items specific and small. "Improve communication" is too vague. "Start using Slack threads for code review discussion" is actionable. Small, concrete changes are more likely to stick.',
    'The team owns action items, not the Scrum Master. Assign an owner in the retro: "Sarah will set up the Slack workflow by next standup". Follow up. Shared ownership means no ownership!',
  ],

  'Definition of Done - what should it include': [
    'Essential items: code complete, tests passing, code reviewed, deployed to staging, acceptance criteria met, documentation updated. Adjust based on your context - these are starting points.',
    'Balance: too loose and quality suffers ("code compiles" isn\'t enough). Too strict and velocity tanks ("100% test coverage + performance testing + UX review" is overkill for every story).',
    'DoD should reflect "potentially shippable". If you had to release tomorrow, would this story be ready? If no, it\'s not done. DoD ensures sprint output is releasable quality.',
    'Common items: unit tests written, integration tests passing, no linting errors, peer reviewed, merged to main, regression tests pass, product owner accepts, no known bugs. Tailor to your stack and standards!',
    "Review DoD quarterly. As team matures, raise the bar: add accessibility checks, performance tests, security scans. DoD should evolve with the team's capabilities and product needs.",
  ],

  'Adjusting Definition of Done mid-sprint': [
    'Don\'t change DoD mid-sprint! It\'s the contract for "done". Changing it invalidates estimates and commitments. Teams need predictability. Wait for retro to discuss and adjust for next sprint.',
    "Exception: if DoD is blocking all work (too strict, didn't anticipate a constraint), discuss with team. But this is a failure of sprint planning - DoD should be agreed before sprint starts!",
    'If you realize DoD is inadequate mid-sprint (like, we forgot to include security review), add it as a separate task for this sprint, update DoD for future sprints in the retro. Don\'t retroactively change what "done" means.',
    "DoD is a team agreement. Don't change it unilaterally. Discuss in retro, get consensus, apply to next sprint. Consistency sprint-to-sprint is important for velocity and trust.",
    "Red flag: if you're frequently adjusting DoD, your sprint planning and refinement are weak. Invest time in those ceremonies to clarify requirements and acceptance criteria before sprint starts!",
  ],

  'Product Owner vs Scrum Master - role clarity': [
    'PO: owns the backlog, prioritizes work, defines acceptance criteria, represents stakeholders, says "what to build". SM: facilitates process, removes impediments, coaches team, protects team from disruptions, ensures "how we work".',
    'PO focuses on value and product. SM focuses on process and team health. PO maximizes ROI, SM maximizes team effectiveness. Different goals, complementary roles!',
    "Can one person do both? Technically yes, but it's hard. PO wants to maximize features, SM wants to protect team capacity. Tension is healthy! If same person, they might push team too hard or under-deliver to stakeholders.",
    'PO works with stakeholders to understand needs, translates to user stories, prioritizes backlog. SM works with team to improve process, remove blockers, facilitate ceremonies. Minimal overlap in day-to-day work.',
    'Think of it: PO is "what" and "why", SM is "how" and "how well". Both essential, different skill sets. Good PO has domain knowledge and stakeholder management. Good SM has coaching skills and process expertise.',
  ],

  'Product backlog prioritization techniques': [
    "Common techniques: 1) Value vs Effort matrix (high value, low effort first), 2) MoSCoW (Must, Should, Could, Won't), 3) WSJF (Weighted Shortest Job First - cost of delay / job size), 4) Kano model (basic, performance, delight).",
    'I use value vs effort: plot stories on 2x2 grid. High value + low effort = do first (quick wins). High value + high effort = plan carefully. Low value + low effort = fill gaps. Low value + high effort = drop or defer.',
    "Consider: business value, user value, risk reduction, technical dependencies. Don't just prioritize by business value - sometimes you need to pay down tech debt or reduce risk first!",
    "Involve stakeholders in prioritization. PO doesn't decide alone - gather input from customers, team, leadership. But PO makes final call. It's a balancing act between competing interests.",
    'WSJF is great for SAFe/large programs: prioritize by cost of delay divided by job size. Quantifies urgency and size. Example: feature worth $100k/month if delayed, takes 2 weeks → WSJF = 100/2 = 50. Higher WSJF = higher priority.',
    'Re-prioritize regularly! Backlog is dynamic. New information, changed business needs, technical discoveries - all affect priority. Review top of backlog every sprint, entire backlog quarterly.',
  ],

  'Responding to change vs following a plan': [
    'Agile values responding to change, but stakeholders want predictability. Balance: 1) Plan in horizons (detailed next sprint, rough next quarter, vague beyond), 2) Use velocity for predictable capacity, 3) Communicate tradeoffs (new feature = something else drops).',
    'Set expectations: we commit to sprint goal (short-term predictability), but backlog can change (long-term flexibility). Stakeholders get both: confidence in near-term delivery + ability to pivot based on feedback.',
    "Use sprint reviews to show progress and gather feedback. This builds trust: stakeholders see regular delivery, they're more comfortable with change. Trust enables agility!",
    'When change request comes mid-sprint: is it more valuable than sprint goal? If yes, discuss with team, maybe swap stories. If no, add to backlog for future sprint. Protect sprint goal, but be pragmatic.',
    'Roadmap technique: now/next/later. Now (current sprint) = committed. Next (next 1-2 sprints) = planned but flexible. Later (3+ sprints out) = ideas, subject to change. Gives direction without false precision.',
    'The key: deliver frequently (show value, build trust), communicate openly (explain tradeoffs), prioritize ruthlessly (say no to low-value requests). This earns you the trust to be agile!',
  ],

  'Working software over documentation - limits?': [
    "Agile doesn't mean zero documentation! Minimum necessary documentation: README (how to run), API docs (how to use), architecture decisions (why we built it this way). If the team needs it or future maintainers need it, document it.",
    'Rule of thumb: document what you can\'t express in code. Code is documentation of "what". Comments/docs explain "why". Architecture decisions, tradeoffs, context - these need docs.',
    "Don't create docs no one reads! Ask: who will read this? When? If you can't answer, skip it. Focus on living documentation: README, inline comments, API docs generated from code.",
    'Examples of necessary docs: onboarding guide (how new dev gets started), runbook (how to deploy/operate), API reference (how to integrate). Examples of unnecessary: detailed design docs that get outdated, requirements docs that duplicate user stories.',
    "I follow: comprehensive README, ADRs (architecture decision records) for big decisions, inline comments for complex code, OpenAPI/Swagger for APIs. That's enough for most projects. More than that is probably waste unless you have compliance requirements.",
  ],
};

/**
 * Thank you response templates for resolved questions
 * Used when question is marked as resolved and has a helpful response
 */
const thankYouTemplates = [
  'Thanks so much! This really helped me understand it. Marking this as resolved.',
  "Perfect, that's exactly what I needed. Really appreciate the detailed explanation!",
  'This makes so much sense now. Thank you for taking the time to explain!',
  'Got it working! Thank you for the clear explanation and examples.',
  'That cleared up my confusion completely. Thanks for the help!',
  'Excellent explanation! This helped me move forward with my project. Thank you!',
  'Thank you! This was really helpful and now I understand the concept much better.',
  'This worked perfectly! Really appreciate you taking the time to help.',
  "That's exactly the insight I needed. Thanks for the clear and helpful response!",
  'Perfect explanation! This helped me finish my assignment. Thank you so much!',
];

/**
 * Generates random date after a given date
 */
const getRandomDateAfter = (afterDate) => {
  const after = new Date(afterDate);
  const now = new Date();
  const range = now.getTime() - after.getTime();
  if (range <= 0) {
    // If afterDate is in future or now, add random time forward
    const randomMs = Math.floor(Math.random() * 3600000); // Up to 1 hour
    return new Date(after.getTime() + randomMs);
  }
  const randomTime = after.getTime() + Math.floor(Math.random() * range);
  return new Date(randomTime);
};

/**
 * Seeds responses for all questions with hardcoded, contextually relevant responses
 */
export const seedResponses = async (questionIds, studentIds) => {
  try {
    const responsesCollection = getCollection(COLLECTIONS.RESPONSES);
    const questionsCollection = getCollection(COLLECTIONS.QUESTIONS);
    const studentsCollection = getCollection(COLLECTIONS.STUDENTS);

    // Clear existing responses
    await responsesCollection.deleteMany({});

    const allResponses = [];

    // Process each question
    for (const questionId of questionIds) {
      const question = await questionsCollection.findOne({ _id: questionId });
      if (!question) continue;

      // Get responses for this question from the map
      const responseContents = questionResponseMap[question.title] || [];

      // Get potential responders (exclude question poster)
      const potentialResponders = studentIds.filter(
        (id) => id.toString() !== question.posterId.toString()
      );

      if (potentialResponders.length === 0) continue;

      // Track timestamps to ensure chronological order
      let lastResponseTime = new Date(question.createdAt);

      // Create responses from the mapped content
      for (let i = 0; i < responseContents.length; i++) {
        // Pick random student as responder
        const randomIndex = Math.floor(
          Math.random() * potentialResponders.length
        );
        const responderId = potentialResponders[randomIndex];

        const responseTime = getRandomDateAfter(lastResponseTime);
        lastResponseTime = responseTime;

        // For resolved questions, mark the first response as helpful (50% chance)
        // This matches the original logic
        const isHelpful = question.isResolved && i === 0 && Math.random() > 0.5;

        const response = {
          questionId,
          posterId: responderId,
          content: responseContents[i],
          isAnonymous: Math.random() > 0.8, // 20% chance of anonymous
          isHelpful,
          createdAt: responseTime,
          updatedAt: responseTime,
        };

        allResponses.push(response);
      }

      // Add thank you response for resolved questions (80-90% of the time)
      // Only if there are responses and one was marked helpful
      if (
        question.isResolved &&
        responseContents.length > 0 &&
        Math.random() > 0.15
      ) {
        const hasHelpfulResponse = allResponses.some(
          (r) =>
            r.questionId.toString() === questionId.toString() && r.isHelpful
        );

        if (hasHelpfulResponse) {
          // Find the helpful response to reference it
          const helpfulResponse = allResponses.find(
            (r) =>
              r.questionId.toString() === questionId.toString() && r.isHelpful
          );

          // Get the helpful responder's name for the thank you (unless anonymous)
          let thankYouContent;
          if (helpfulResponse.isAnonymous) {
            // Generic thank you if helpful response was anonymous
            thankYouContent =
              thankYouTemplates[
                Math.floor(Math.random() * thankYouTemplates.length)
              ];
          } else {
            // Get responder's name
            const responder = await studentsCollection.findOne({
              _id: helpfulResponse.posterId,
            });
            if (responder) {
              const responderName = responder.firstName;
              // Create specific thank you mentioning the helper
              const templates = [
                `Thanks ${responderName}! This really helped me understand it. Marking this as resolved.`,
                `Perfect, that's exactly what I needed ${responderName}. Really appreciate the detailed explanation!`,
                `This makes so much sense now. Thank you ${responderName} for taking the time to explain!`,
                `Got it working! Thank you ${responderName} for the clear explanation and examples.`,
                `That cleared up my confusion completely. Thanks for the help ${responderName}!`,
                `Excellent explanation ${responderName}! This helped me move forward with my project. Thank you!`,
                `Thank you ${responderName}! This was really helpful and now I understand the concept much better.`,
                `This worked perfectly! Really appreciate you taking the time to help ${responderName}.`,
              ];
              thankYouContent =
                templates[Math.floor(Math.random() * templates.length)];
            } else {
              thankYouContent =
                thankYouTemplates[
                  Math.floor(Math.random() * thankYouTemplates.length)
                ];
            }
          }

          const thankYouTime = getRandomDateAfter(lastResponseTime);

          const thankYouResponse = {
            questionId,
            posterId: question.posterId, // Poster thanks the helper
            content: thankYouContent,
            isAnonymous: question.isAnonymous, // Match poster's anonymity
            isHelpful: false,
            createdAt: thankYouTime,
            updatedAt: thankYouTime,
          };

          allResponses.push(thankYouResponse);
        }
      }
    }

    if (allResponses.length > 0) {
      const result = await responsesCollection.insertMany(allResponses);
      console.log(
        `Seeded ${result.insertedCount} high-quality responses across all questions`
      );
      console.log(
        `   - Responses mapped to specific questions (0-8 per question)`
      );
      console.log(
        `   - Thank you responses included for most resolved questions`
      );
      console.log(`   - All timestamps chronologically ordered`);
      return Object.values(result.insertedIds);
    } else {
      console.log('No responses to seed');
      return [];
    }
  } catch (error) {
    console.error('Error seeding responses:', error);
    throw error;
  }
};

// Vercel Serverless Function — Proxy seguro para xAI / Grok
export default async function handler(req, res) {
  // Solo POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const XAI_API_KEY = process.env.XAI_API_KEY;
  if (!XAI_API_KEY) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const response = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${XAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'grok-3-mini',
        messages: [
          {
            role: 'system',
            content: `Eres Amsita, la agente inmobiliaria virtual de Angelo en Cabo San Lucas, Baja California Sur, México.
Representas a Angelo Aranda Montaño, Arquitecto de Realidades Patrimoniales, experto en propiedades de lujo en Los Cabos.

Tu personalidad:
- Elegante, cálida y profesional — hablas como si atendieras a un cliente VIP
- Conoces perfectamente las zonas: Palmilla, Querencia, Diamante, Pedregal, Quivira
- Siempre orientas hacia una consulta privada con Angelo
- Usas lenguaje sofisticado pero accesible
- Respondes en español (si el usuario escribe en inglés, responde en inglés)
- Máximo 3 párrafos por respuesta — eres concisa y de valor
Propiedads que manejamos:
MLSCSLP: 25-3368
OVERVIEW: Parcel Lot 3 El Zalate offers over 39 acre (15.94 hectares) of development land located in the San José Corridor. This strategic parcel features 237 linear meters of frontage along the Transpeninsular Highway. The property is zoned RT0 (Residential-Tourism), allowing for a diverse range of development possibilities including residential communities, resort accommodations, or mixed-use projects, subject to applicable municipal planning and land use regulations. Situated on an elevated topography, the site offers commanding ocean views of San José Bay and Punta Gorda. The land's proximity to renowned destinations such as Palmilla, San José del Cabo's historic downtown, and major golf and beach amenities further strengthens its investment potential. ______ Lote 3 El Zalate ofrece más de 15.94 hectáreas (39 acres) de terreno urbanizable ubicado en el Corredor de San José. Esta parcela cuenta con 237 metros lineales de frente a la Carretera Transpeninsular. La propiedad está clasificada como RT0 (Residencial-Turístico), lo que permite una amplia gama de posibilidades de desarrollo, incluyendo comunidades residenciales, complejos hoteleros o proyectos de uso mixto, sujetos a la planificación municipal y las regulaciones de uso del suelo aplicables. Ubicado en una topografía elevada, el terreno ofrece imponentes vistas al océano, a la Bahía de San José y Punta Gorda. La proximidad del terreno a destinos de renombre como Palmilla, el centro histórico de San José del Cabo y a importantes opciones de golf y playa refuerza aún más su potencial de inversión.

MLSCSLP: 25-4408
OVERVIEW: A truly rare offering, this 5.3-hectare oceanside parcel is the last remaining developer lot between Palmilla Villas Del Mar and Rancho Cerro Colorado. Zoned ATO (Touristic Commercial Residencial), it presents endless opportunities for world-class projects. With 158 meters of highway frontage and stunning elevation, the hillside location grants the right to construct up to six stories, ensuring forever panoramic ocean views. This unique property is a developer's dream—an irreplaceable chance to create a landmark in the most exclusive area of San José del Cabo. Uniting prime location, zoning flexibility, and extraordinary views, it is one of the most coveted development parcels in Los Cabos.

MLSCSLP: 25-907
OVERVIEW: Terraced into the desert hillside, edged by verdant arid wild spaces, a two story home on lot 3 will make the best use of the space. Clerestory windows will bathe the home with tons of energetic light and accentuate to the views to live for. Perfect positioning for Cabo sunrises and blue water views - watch the birds soar at eye level and spy for the seasonal whales that play off the pristine Palmilla beach.

MLSCSLP: 24-774
OVERVIEW: Uniquely positioned in the heart of the Legado development, lot 10 is a desert jewel. This large lot can easily be the site of an extensive single story residence. This homesite capitalizes on the surrounding green spaces to create a private sanctuary which emphasizes the flawless interplay of desert living by the seaside.

MLSCSLP: 25-906
OVERVIEW: This ample lot is the perfect location for your custom dream home. Large enough for a single story villa or a multi-level home with an open floor plan, this site will stimulate the mind with vast blue water horizon views. With seamless flow between indoor and outdoor living spaces, the scenery incorporates into your residence - like a private country dwelling nestled in the esteemed Legado community, perfect for friends and family alike.

MLSCSLP: 26-475
OVERVIEW: Build your dream home with ocean and city views on one of the last remaining lots for sale in the exclusive Caleta Loma neighborhood. Caleta Loma is located in the master planned Palmilla community, which features a 27-hole Jack Nicklaus Signature golf course, swimmable beach, the One & Only Hotel and The Shoppes at Palmilla.

MLSCSLP: 25-1340
OVERVIEW: Discover the epitome of luxury living in Punta Bella, an exclusive gated residential community nestled in the idyllic paradise of Los Cabos. This stunning corner lot boasts breathtaking ocean views that will elevate your lifestyle to new heights. Imagine waking up to the serene sounds of the waves and witnessing mesmerizing sunrises from the comfort of your future dream home. Ideally situated, this prime location offers unparalleled convenience with grocery stores, gourmet restaurants, lively bars, and essential services like hospitals, gas stations, banks, golf courses, and business facilities at the Koral Center just moments away. Families will appreciate the proximity to a reputable private school, Picacho McGregor, and a well-equipped fitness center, all while enjoying the tranquility and privacy that Punta Bella provides. With 24-hour security, you can relax knowing your home is protected. A mere two-minute walk will take you to the pristine swimmable beach, where you can indulge in sun-soaked days and refreshing ocean breezes. Don't miss this rare opportunity to create a sanctuary in one of the most exclusive and serene communities in Los Cabos. Home rendering is for visual purposes only, they are not actual home plans. Building height restrictions allow for a two-story home with a height limit of 7-meters.

MLSCSLP: 25-4077
OVERVIEW: Just a 5-minute walk or golf cart ride to the swimmable shores of Palmilla Beach and Club 96 Beach Club, and moments away from the newly private Palmilla Golf Club—exclusively managed by One&Only Resorts. Unlike most offerings, this property is truly ready to go—all architectural plans are complete, city license fees are paid, and approvals from the Palmilla Master and Caleta Loma HOA are in place. Designed by the architectural firm Nogasa, who has designed stunning projects in Palmilla and Querencia, this project lets you break ground the moment you close—no red tape, no delays. This is more than a homesite. It's a turnkey launchpad for your Los Cabos lifestyle—where morning surf sessions, private workouts, and sunset dinners are part of everyday living.

MLSCSLP: 25-4777
OVERVIEW: Caleta Loma Lot 94, is a truly exceptional property and one of the last oceanside lots available in the highly sought-after Palmilla neighborhood. This privileged location offers breathtaking, panoramic ocean and city views, providing the perfect canvas for designing and building your dream family villa, your ultimate escape in paradise! Palmilla stands out as one of the most desirable communities in Cabo, boasting not only a world-class golf course but also access to a beautiful swimmable beach. Residents enjoy the convenience of exquisite shops and gourmet restaurants, all within this exclusive enclave.This is a unique and rare opportunity to become a homeowner in this grand community and build a bespoke residence tailored to your lifestyle.

MLSCSLP: 25-3336
OVERVIEW: Caleta Loma Lot 81 is an exceptional homesite in one of Palmilla's most private oceanside Culdesacs. Spanning 2,320 M2, this build-ready parcel offers great ocean views overlooking the Golf Course and O&O Palmilla Resort. Just a short walk or golf cart ride from a private Swimmable Beach, Shoppes at Palmilla, 10 Restaurants, and the newly private Palmilla Golf Club. This location blends privacy with exceptional convenience. The lot is ideally positioned near Grocery Stores, Hospital H+, Bank, and a private school. The approved Palmilla Master HOA Custom Architectural plans and renderings are included with the listing price. All ready to submit to the municipality for construction license permits, allowing you to quickly break ground.

MLSCSLP: 26-587
OVERVIEW: Caleta Loma is one of the few pristine sub-communities within the legendary luxury development of Palmilla. This Homesite - of 2,334 M2 offers the utmost privacy with spectacular ocean views, situated atop this private oceanfront community. The lot features unobstructed 180-degree views of the highly prized One&Only Palmilla Resort and Punta Gorda. It is located only a few steps away from a private, swimmable beach. Centrally located across from key amenities such as the Fresco supermarket, H+ Hospital, a bank, a private school, and the Palmilla Shopping Plaza.The site is flat and ready for you to build your desired dream home. Architectural project included in asking price and available upon request.

MLSCSLP: 24-1148
OVERVIEW: Palmilla Park is designed to highlight the expert use of outdoor spaces; the 35 large homesites surround multipurpose fields, biking, and hiking trails. Every homesite takes advantage of the native desert landscape that distinguishes the community. Family oriented spaces will enhance the connection to nature and provide an outdoor lifestyle community. The large plots of land with nature driven perimeters will provide a sense of openness and space.

MLSCSLP: 25-5618
OVERVIEW: Palmilla Canyon Homesite 5 presents a rare opportunity to build a home in the most established luxury beach and golf resort in Los Cabos, the one & only Palmilla. With its swimmable beach, no less than 15 gourmet restaurants, luxury shopping and salon at The Shoppes at Palmilla and the One&Only Spa all within a short golf cart ride, Palmilla Canyon sits in the heart of one of the most desirable zipcodes in the region. From its elevated location perched above a palm-filled canyon, the half-acre homesite provides direct views to the Sea of Cortez to the east and the mountain ranges to the west. Palmilla Canyon is one of the few subdivisions in Palmilla with low HOA fees.

MLSCSLP: 26-1764
OVERVIEW: This homesite offers the opportunity to build a luxury residence in the heart of Palmilla. Positioned on the Arroyo 7 with sweeping views down the fairway and the ocean in the horizon. This is the ideal setting for buyers who value private golf and refined living. Lot 56 Palmilla Estates is designed for a one-story custom build. Just minutes away in this gated community, one can enjoy the Palmilla Social Club, Palmilla's swimmable beach, the Shoppes of Palmilla, pickleball, tennis and over 14 restaurants to choose from, all drivable with your golf cart.

MLSCSLP: 26-929
OVERVIEW: Designed to welcome and inspire, Palmilla Park embraces unparalleled outdoor living with vast protected natural areas. Its 35 thoughtfully positioned homesites enjoy breathtaking views of a reserve featuring parks, open fields, walking trails, a desert botanical garden, and wildlife observation pavilions. Residents also enjoy access to The Reserve Club, offering premier amenities including recreational areas, restaurant, family pool, fitness center, and privileged access to the El Once Golf Course. Lot 14 is ideal for building a dream estate, with generous dimensions that invite expansive, open-concept design--an exceptional lifestyle and investment opportunity.

MLSCSLP: 24-630
OVERVIEW: Palmilla Park is designed to highlight the expert use of outdoor spaces; the 35 large homesites surround multipurpose fields, biking, and hiking trails. Every homesite takes advantage of the native desert landscape that distinguishes the community. Family oriented spaces will enhance the connection to nature and provide an outdoor lifestyle community. The large plots of land with nature driven perimeters will provide a sense of openness and space.

MLSCSLP: 24-635
OVERVIEW: Palmilla Hills is situated on a hillside between the two championship golf courses of Palmilla and Querencia, and showcases 14 homesites with ocean, golf course, and mountain views, offering seclusion and privacy. This neighborhood of Palmilla del Mar was developed to benefit from the native nature within the community and the hillside views where the light purple and fuchsia of the sunset blend.

MLSCSLP: 24-636
OVERVIEW: Palmilla Hills is situated on a hillside between the two championship golf courses of Palmilla and Querencia, and showcases 14 homesites with ocean, golf course, and mountain views, offering seclusion and privacy. This neighborhood of Palmilla del Mar was developed to benefit from the native nature within the community and the hillside views where the light purple and fuchsia of the sunset blend.

MLSCSLP: 23-289
OVERVIEW: Palmilla Hills is situated on a hillside between the two championship golf courses of Palmilla and Querencia, and showcases 14 homesites with ocean, golf course, and mountain views, offering seclusion and privacy. This neighborhood of Palmilla del Mar was developed to benefit from the native nature within the community and the hillside views where the light purple and fuchsia of the sunset blend.

MLSCSLP: 26-860
OVERVIEW: Premium, rare, oversized homesite in private Palmilla Estates - the largest lot currently available. Spanning 1,724.77 m² and listed at $1,099,000 USD, this lot comes with approved architectural plans for a residence, making construction faster and less risky. Perfect for a spacious single- or multi-pavilion estate, with extensive outdoor living areas, a pool, and private gardens. Features include the largest lot in the community (1,724.77 m²), approved construction plans, and exceptional privacy and development flexibility. Residents have access to Palmilla's top-tier amenities, such as Jack Nicklaus golf, a private beach, and exclusive clubs (membership optional). This is a strong long-term investment in a prime Los Cabos location. Ready to build--contact us for plans and site details

MLSCSLP: 25-1029
OVERVIEW: Flat golf-front homesite in Palmilla Estates overlooking the 8th tee of Arroyo with ocean views. Ideal for a custom residence, the lot allows for a one or two-story build to maximize layout and views. Clean topography supports efficient construction compared to larger, more complex parcels. Located within a private, upscale community near golf, beaches, dining, and the One&Only Palmilla.

MLSCSLP: 24-633
OVERVIEW: Palmilla Hills is situated on a hillside between the two championship golf courses of Palmilla and Querencia, and showcases 14 homesites with ocean, golf course, and mountain views, offering seclusion and privacy. This neighborhood of Palmilla del Mar was developed to benefit from the native nature within the community and the hillside views where the light purple and fuchsia of the sunset blend.

MLSCSLP: 26-552
OVERVIEW: Lot 17 is located in Palmilla Estates, a sub-condominium of the master-planned Palmilla community in San Jose del Cabo. The property measures 1,478.60 square meters. Ideally situated at the tee boxes of the 9th hole of the Palmilla Mountain Course, this homesite allows you to enjoy the views and sounds of golf course living without the fear or danger of stray shots. Looking down the fairview allows views of the Sea of Cortez on both sides of Punta Palmilla. With recent changes in the structure of the golf course and memberships, and the newly released Palmilla Social Club, you have the choice to live a complete golf community lifestyle with access to golf and beach, or simply enjoy your beautiful golf course home without joining any clubs. This is a rarity in Los Cabos.

MLSCSLP: 25-5183
OVERVIEW: RESERVA C1 is a single-level contemporary residence that entertains residents with one of the best views in Cabo due to its height and proximity to the shoreline. Positioned at one of the highest points within Villas del Mar, Palmilla. Located within RESERVA, a boutique collection of just 16 residences, C1 represents the first resale opportunity in over two years. The signature RESERVA floor plan reflects over three decades of development experience in Cabo, with a focus on efficient layouts, climate responsiveness, privacy, and long-term livability. C1 offers a generous seamless indoor-outdoor living space covering 4 beds and 4.5 baths over 6,700 sq ft of total space including terraces, a private pool, and a 2-car garage. A phenomenal attention to detail and efficiency is incorporated into the floor plan. Retaining its long term unique value. RESERVA has a thorough design that considers all aspects to optimize the property's lifestyle, paying attention to climate, location, sun exposure, privacy, effortless maintenance, and amenities. Architectural highlights include 14 ft high ceilings, 70 linear feet of ocean view, pocket sliding doors, built-in hurricane protection, flushed interior-to-exterior flooring with integrated drainage, an infinity-edge pool with hot tub, outdoor kitchen, and a sunken fire pit - all in a single-level environment. C1 stands apart as the only single-level floor plan currently available in a neighborhood where approximately 90% of homesites are already developed. Villas del Mar has consistently demonstrated strong value retention and appreciation since its establishment in 1995, making C1 a compelling opportunity within a proven luxury market. Residents have privileged access to plenty of amenities only a short golf cart ride away - private beach, Espiritu Fitness Club, private beach club, organic garden, Café Espiritu, The Shoppes at Palmilla, and the One & Only Hotel Club Ninety-Six and Espiritu Fitness Center are available upon application approval and payment of membership

MLSCSLP: 25-5663
OVERVIEW: Like-new and impeccably maintained, this contemporary Ledges residence offers effortless, low-maintenance living with high-end finishes and a refined modern furniture package. Enjoy expansive ocean views toward San JosÃ© and the Sea of Cortez, generous indoor-outdoor spaces, and a private poolside living room. The three-suite layout is open and bright, designed for easy, elegant living. A one-car garage with storage and quick walking access to Club Espiritu and the town center complete this move-in-ready home.

MLSCSLP: 26-2162
OVERVIEW: Iconic Palmilla garden condominium with sweeping ocean and mountain views. Designed with comfort, entertaining, and indoor-outdoor living in mind, this rare two-bedroom, two-bath residence offers an exceptional lifestyle opportunity. The open-plan kitchen and living area flow seamlessly onto an expansive terrace featuring both covered and sun-drenched spaces--perfect for relaxing or hosting guests. A recently added hot tub with fountain enhances the outdoor experience, complemented by a newly updated kitchen ideal for entertaining. The primary suite and ensuite bath enjoy direct views of the terrace and the stunning scenery beyond, while the guest bedroom and bath are thoughtfully positioned at the opposite end of the home for maximum privacy. A private double garage provides space for both a car and golf cart, along with an impressive full-wall storage area conveniently located just across from the condo. A community pool is shared by only 14 other residences. Set atop a scenic ridge within the gated Villas de Montaña community, this home offers security, privacy, and the coveted Palmilla lifestylejust moments from world-class beaches, golf, dining, and amenities.

MLSCSLP: 25-4859
OVERVIEW: Within Palmilla, one of Cabo´s most prestigious communities, this turn key penthouse with a private rooftop offers beautiful views of the Sea of Cortez. With a short golf cart ride, you can enjoy over 10 restaurants, 2 plazas, a weekly organic market, luxury amenities and a swimmable beach. *A Platinum Membership for Palmilla Dunes Private Club is included in the sales price with a transfer fee which allows your renters to be able to access the amenities in the case of wanting to rent the property. Nothing compares to the Palmilla lifestyle in Los Cabos.

MLSCSLP: 26-892
OVERVIEW: Welcome to luxury coastal living in Palmilla - Villas de Montana. This stunning 2-bedroom, 2.5-bathroom condo offers breathtaking ocean views from every room, perfectly capturing the beauty of the Sea of Cortez. Designed with an open-concept layout, the spacious living and dining areas flow seamlessly together beneath soaring vaulted ceilings, creating a bright and airy atmosphere ideal for relaxing or entertaining. Expansive glass doors lead to an oversized terrace overlooking the brilliant blue waters -- the perfect setting for morning coffee, sunset cocktails, or simply enjoying the ocean breeze. Each bedroom offers privacy and comfort, complemented by beautifully appointed en-suite bathrooms. The thoughtful floor plan maximizes both views and functionality. Located within an exclusive community of only 14 units, this unique condo offers privacy and tranquility while being just steps from the community pool and the swimmable shores of Palmilla Beach. Enjoy the best of beachfront living in one of the most desirable gated communities in Palmilla. A rare opportunity to own a slice of paradise in Villas de Montana.

MLSCSLP: 25-5238
OVERVIEW: Penthouse within Palmilla, one of the most exclusive communities where in just a short golf cart ride you will find over 15 restaurants, 2 plazas, and one of Cabo´s most swimmable beaches. Property includes 2 garages which are very sought after in the community, giving you the opportunity to rent one of them. All bedrooms, outdoor patio and rooftop furniture is included in the sale. Living and dining area comes unfurnished. Property includes upgrades like an extra countertop with a sink on the main terrace, a jacuzzi on the rooftop, a second garage, higher ceilings in the bedrooms and custom owners cabinets above all closets, toto toilet & biden in master bath, extra outlets and a platinum membership for the Palmilla Dunes Club with a transfer fee that shall be paid by the buyer.

MLSCSLP: 25-202
OVERVIEW: Turn key penthouse within Palmilla, one of Cabo´s most exclusive communities where over 10 restaurants, luxury amenities, a weekly organic market, 2 plazas and a swimmable beach are all just a golf cart ride away. Property offers a main terrace with pocket doors and a private rooftop with a fire pit and a barbecue where you can enjoy beautiful views of views of the Sea of Cortez. Property comes with a platinum membership for the Palmilla Dunes Club which is just steps away from the unit (tennis, pickle ball, paddle, soccer, 2 floor gym, pool, restaurant bar, sauna, steam room and more). *Transfer fee to be paid by the buyer. Nothing compares to the golf cart lifestyle in Palmilla. Special features: First row of buildings, hurricane shutters included, turn key property.

MLSCSLP: 26-1226
OVERVIEW: Experience elevated resort style living in this stunning 3-bedroom penthouse. Designed with an expansive open-concept layout, the living, dining, and kitchen areas flow seamlessly together, highlighted by oversized sliding glass doors that open to a spacious private terrace, ideal for outdoor dining and elegant entertaining. Each of the three bedrooms offers a beautifully appointed in-suite bathroom and refined furnishings, providing comfort, privacy, and a sophisticated retreat for residents and guests alike. The private rooftop terrace is designed for exceptional outdoor living, featuring a built-in BBQ, fire pit, and generous lounge seating--perfect for enjoying the ocean view, breathtaking sunrises, spectacular sunsets, and the relaxed luxury lifestyle. This property does not come with a Palmilla Dunes Club Membership but is eligible for one. Depending on the type of membership it starts at $10,440 per year and goes up to $15,660. More club membership information is available upon request. This property comes with a deeded garage space.

MLSCSLP: 26-1076
OVERVIEW: Enjoy resort-style living with this 3-bedroom corner ground-floor residence at The Palmilla Dunes. This contemporary-style condo is offered fully furnished and turn-key, blending modern design with warm finishes, including travertine floors, parota wood furnishings, and GE Profile appliances. The ''Palm Garden Residence'' layout features a primary bedroom with a king bed and private terrace, plus two back bedrooms, one with two double beds and one with a king, making it ideal for family and guests. Indoor-outdoor living is seamless with pocket doors, a covered exterior terrace, and BBQ area, complemented by a private putting green perfect for fun and entertaining. An oversized one-car garage is located directly in front of the unit, and a luxury six-seater golf cart is included for convenient access to Palmilla's shopping centers, restaurants, and swimmable beach. Whether you're looking for a private vacation retreat or an investment rental, this property offers a ready-to-enjoy lifestyle, with optional access to The Dunes Club amenities, including tennis, pickleball, and paddle courts, gym and spa, semi-Olympic pool, jacuzzi, movie theater, sports bar, and clubhouse.

MLSCSLP: 26-1074
OVERVIEW: Enjoy resort-style living with this 3-bedroom corner ground-floor residence at The Palmilla Dunes. This contemporary-style condo is offered fully furnished and turn-key, blending modern design with warm finishes, including travertine floors, parota wood furnishings, and GE Profile appliances. The ''Palm Garden Residence'' layout features a primary bedroom with a king bed and private terrace, plus two back bedrooms, one with two double beds and one with a king, making it ideal for family and guests. Indoor-outdoor living is seamless with pocket doors, a covered exterior terrace, and BBQ area, complemented by a private putting green perfect for fun and entertaining. An oversized one-car garage is located directly in front of the unit, and a luxury six-seater golf cart is included for convenient access to Palmilla's shopping centers, restaurants, and swimmable beach. Whether you're looking for a private vacation retreat or an investment rental, this property offers a ready-to-enjoy lifestyle, with optional access to The Dunes Club amenities, including tennis, pickleball, and paddle courts, gym and spa, semi-Olympic pool, jacuzzi, movie theater, sports bar, and clubhouse.

MLSCSLP: 26-314
OVERVIEW: This exceptional penthouse delivers a refined Cabo lifestyle at an outstanding value, making it one of the most compelling opportunities in Quivira. The residence features two bedrooms, soaring ceilings (only found in the Penthouses in Copala), and breathtaking open views over the Pacific Ocean and championship golf course. Designed to maximize indoor-outdoor living, the home opens to a generous terrace equipped with a built-in BBQ and bar area, while the private rooftop offers a jacuzzi and lounge space ideal for relaxing or hosting guests. The interior has been carefully enhanced with premium GE Profile appliances, custom millwork, water filtration, hurricane protection, and sophisticated coastal details throughout. Owners enjoy full access to Copala's resort-level amenities, including multiple pools, the Quivira Beach Club, spa, fitness centers, community shuttle, and the Jack Nicklaus-designed golf course an elevated turnkey retreat in the heart of Los Cabos. Upgrades & Features Interior Enhancements - Complete repaint (removed original developer paint) - Custom blackout draperies on all windows and sliders - Custom mirrors in both bathrooms - Custom added interior doors in primary bath and second bedroom - Custom storage shelving in utility room and front hall closet Kitchen & Appliances - Upgraded GE Profile appliance package Comfort & Systems - High-capacity hot water tank (installed 2022) - Comprehensive water purification + filtration system Outdoor / Terrace - Built-in Weber BBQ with bar fridge and wet bar (on terrace) - Built-in rooftop jacuzzi - Screened sliders and windows for airflow + bug protection - Hurricane shutters Included - Turnkey - fully furnished and outfitted (just bring your suitcase)

MLSCSLP: 25-2849
OVERVIEW: Spacious 2-bedroom 2-bath condo located in Mavila Towers within Quivira Los Cabos. This well-designed unit features an open living-dining area, fully equipped kitchen, and large private terrace with panoramic views of the new Jack Nicklaus golf course and the ocean. Both bedrooms include full bathrooms. Owners enjoy access to the Quivira Beach Club, pools, gym, and resort amenities. Ideal for full-time living or investment in a world-class gated community.

MLSCSLP: 25-4320
OVERVIEW: PRICE REFINED - A beautifully positioned 3BD penthouse with private rooftop and turn-key furnishings is now offered at an exceptional new value. Step into living at Mavila, Quivira, Los Cabos, to enjoy resort-style living in this fully furnished 3-bedroom, 2.5-bathroom penthouse. Located in a duplex-style building on the second floor. Designed for comfort and functionality. Offers privacy with bedrooms slightly separated from the spacious living and dining areas. The condo comes with laundry and spacious storage. The crown jewel is the private rooftop terrace with panoramic views—overlooking the new Jack Nicklaus Signature Golf Course on one side and the Pacific Ocean on the other As a Mavila owner, you'll enjoy exclusive access to world-class Quivira Golf, a private beach club, wellness and fitness centers, walking and jogging trails, plus a wide range of casual and fine dining options across the Quivira resort and hotels. Move in worry-free or take advantage of a strong income-generating opportunity in one of Los Cabos' premier communities. =Þ Call today to schedule your private showing.

MLSCSLP: 25-3908
OVERVIEW: Mavila in Quivira features a fully furnished 3‑bed/3‑bath townhouse with a cozy outdoor terrace, perfect for relaxing or casual dining. The bright kitchen and open family room create a comfortable space, whether used as a top vacation rental or full-time home. The pool, jacuzzi, and grill area are just an arm's length away. Designed with modern hacienda vibes, it offers a stylish and inviting living environment while including all Quivira owner perks and exclusive discounts.

MLSCSLP: 25-5215
OVERVIEW: Discover Providence in the heart of San José del Cabo. Unit A-203 is a beautifully designed two-bedroom, two-bath condominium offering 93.30 Ac m2 / 1003.91 sq. ft. of interior space. This brand-new residence features a fully equipped kitchen with included appliances, elegant finishes, and air conditioning (mini-splits). Exclusive amenities at Providence include a spacious rooftop terrace with panoramic views of the San José Estuary — a prominent city landmark — as well as a swimming pool and restrooms for the convenience of residents. Situated in Downtown San José del Cabo, Providence places you just steps away from the historic Mission of San José, Mijares Square, and the charming Art District, which is filled with restaurants, cafes, and boutiques. Additionally, the property i

MLSCSLP: 25-2860
OVERVIEW: 2BR / 2BA Condo - Mavila Towers, Quivira Two-bedroom, two-bath condo with large terrace offering views of Quivira's second golf course and the Pacific. Includes open kitchen, living-dining area, and access to Quivira amenities: beach club, gym, pools, and golf. Secure gated community, ideal for residence or rental.

MLSCSLP: 26-350
OVERVIEW: Resort-style living awaits in this fifth-floor, ocean-view condo located in the newest tower in Copala within the prestigious Quivira community. This like-new residence offers two bedrooms and two baths, featuring elegant furnishings and décor and is completely turn-key and move-in ready. Enjoy unobstructable views of the ocean and the Jack Nicklaus Signature golf course from the spacious balcony, complete with a jetted spa, Weber BBQ, and wine fridge, perfect for entertaining or relaxing at sunset. The master bedroom features direct walkout access to the balcony and ocean views, while the comfortable guest room provides privacy for visitors. The kitchen is appointed with Taj Mahal countertops, GE Profile appliances, and refined finishes. Travertine floors and bathrooms add to the home's timeless appeal and quality craftsmanship throughout. Residents of Quivira enjoy access to world-class amenities including golf, restaurants, tennis and pickleball courts, beach club, gyms, pools, spa services, community shuttles, full concierge services, and 24-hour security. Water reliability is ensured with the community's private desalination plant. An exceptional opportunity for luxury coastal living.

MLSCSLP: 25-4105
OVERVIEW: 2 bed, 2 bath turnkey condo located on the 3rd floor w great ocean & 17th fairway views. Upgraded travertine flooring, quartz countertops, GE Profile stainless steel appliances. BBQ gas grill w cabinet doors and granite countertop- backsplash. Fully furnished. Water purification system throughout. Full home power surge filter/suppression. Very well looked after. Easy to show. T7 is the only tower in Copala which has ocean/golf views of the 17th and 18th fairways of the Jack Nicklaus Signature Quivira Ocean Course and newest building of all. Another plus of this tower is that you get a nice shade everyday after-noon to make your day even better. See the Sunrise from your living area and direct ocean view from the master bedroom King Size bed. Call Consuelo for show Bike & Jogging Trails. Dog park walking distance. Pueblo Bonito restaurants and Spa discounts. No showings until April 9th. Pls allow 24 hours notice for showings after that date.

MLSCSLP: 26-1836
OVERVIEW: Live in the tranquility of the Mar y Cielo house with panoramic views of the Sea of Cortez and the mountains, it has sliding pocket terrace doors, kitchen with granite counter, cathedral ceiling, fountain in backyard, private pool, closed garage with automatic gate for 2 cars, space for 3 more cars, terrace with pergola; pocket sliding windows, anti-hurricane protections in very good condition for all windows. Enjoy the sunrise from the comfort of your bed and/or the terrace. Located a few minutes from Playa El Tule and Playa Chileno. Additional land of approximately 400m² for you to develop bungalows, a couple of duplexes of 120m² of construction per floor, or another house of 250 to 300m² of two-story construction, with an independent pool and anything else you can think of.

MLSCSLP: 25-5347
OVERVIEW: Own an exclusive beachfront opportunity in Elias Calles—just 25 minutes from Cabo San Lucas and 6 minutes from Cerritos. This elevated, gated property offers 50 meters of pristine Pacific coastline with just under 2,500 m² of beachfront land. Perfect for investors or luxury estate builders, it features breathtaking ocean views, soft sandy beach, direct access, and complete privacy. With a concrete upper level already in place, a large cisterna, water on-site, and a reinforced coastal wall, construction is well underway. Naturally protected from flooding, this property is ideal for a high-end residence or boutique retreat. Buyers have the option to purchase either the left or the right side of the oceanfront parcel, depending on preference or project vision.

MLSCSLP: 25-1142
OVERVIEW: Beautiful Condo with Breathtaking Ocean Views and a 4wd Vehicle in Copala at Quivira in Cabo! This 5th floor 2 bedroom, 2 bathroom, 1,523 sqft condo in tower 1 faces the ocean straight on, allowing for incredible Pacific Ocean Views. Offered completely furnished and turn key and with a 2017, 4 door, 4wd Vehicle included. Located within the Master Plan Golf Community of Quivira just 10 minutes from Downtown Cabo and 25 minutes from the airport. World class amenities available: pools and Jacuzzis, poolside restaurant & bar, gym, golf, tennis, pickleball, hiking and biking trails, spas, restaurants, bars, shopping, white sandy beaches you can walk for miles, beach club, shutlle and concierge services, 24 hr security and more. This is Resort-Style living at its best. Vacation Rentals Allowed!

MLSCSLP: 25-3899
OVERVIEW: Elegant residence in exclusive Copala at Quivira, Cabo's premier golf community. Fully remodeled and tastefully finished, this move-in-ready unit offers comfort, sophistication, and strong rental potential. Price excludes furniture; available for an additional $50,000 USD. Enjoy access to resort-style amenities: tranquil spa, gym, beach club, 25 restaurants, and Jack Nicklaus golf. Ideal as a home, retreat, or investment near Cabo's marina and beaches.

MLSCSLP: 25-4227
OVERVIEW: 2 bed, 2 bath luxury condo located on the fourth floor of tower 5 looks directly at the ocean, pool and community park. Copala Club House w gym, concierge, cinema, pool, kids pool, business center etc Enjoy the Quivira life style with jogging & bike trails, dog park and discounts on golf, spa and pueblo bonito restaurants. Beach Club available for owners exclusively. This condo is perfect to make it your new Cabo home or use it as an investment for rentals and personal use whenever you feel like coming down to the Cabo Life! Please call Consuelo Galindo for showings-

MLSCSLP: 25-103
OVERVIEW: OWNER FINANCING AVAILABLE Stunning ocean view 2 BR condo in the prestigious Quivira development. Enjoy luxurious amenities: infinity pool, fitness center, spa, World-class golf, pristine beaches and a vibrant community. Modern design, high-end finishes, gourmet kitchen. Perfect for a second home or investment. 20% off at Quivira Steakhouse 20% off at Armonia spa 25% off Quivira Golf Acess to Q LIFE program

MLSCSLP: 26-542
OVERVIEW: This beautifully designed condominium at Copala offers an exceptional layout that blends tranquility, sophistication, and functionality. Located on the ground floor of Tower 3, this 3-bedroom, 2.5-bath residence is ideal for full-time living, a second home, or hosting visiting family and friends. Two bedrooms open directly to the garden, just steps from a nearby swimming pool. The condo features an expansive open terrace, perfect for outdoor dining and lounge areas, enhancing seamless indoor-outdoor living. Owners enjoy exclusive access to the Copala Club House with movie theater, gym, deli, swimming pool, and infinity-view amenities.

MLSCSLP: 25-5696
OVERVIEW: Turnkey 2 Bedroom Oceanview Quivira resort Condominium with furniture and an established rental history. Enjoy a full size swimming pool directly in front of Copala Tower 4. Walk to the Copala Clubhouse and experience poolside food & beverage service with a fun social atmosphere. Copala Owners, guests & renters can also enjoy the Copala gym, pools, hot tub, mini super (wine, tequila, beer and conveniences), concierge station and shuttle service to other parts of the Quivira Resort. The 1850 acre Quivira resort has over 15 restaurants &,bars, a world class Golf Course, Tennis & Pickleball, 24 hour security, an Owners' Beach Club, gyms, spas, hiking & biking trails, paved roads and sidewalks and is a low density Master Planned community with more amenities recently announced....

MLSCSLP: 25-2606
OVERVIEW: Escape to paradise with a well-deserved vacation in our exclusive 5-star gated community. Immerse yourself in the beauty of a Jack Nicklaus ''Signature'' Golf Course and indulge in the array of exceptional amenities the area has to offer. Enjoy a variety of recreational opportunities, from tranquil adult pools to fun-filled kiddie pools and vibrant action-oriented pools featuring swim-up bars. The stunning Medano Beach is also within easy reach. For the active, we have tennis courts, hiking trails, and more to explore. Stay connected effortlessly with our reliable TelMex WIFI, allowing you to create a workspace with breathtaking ocean views if needed. This beautifully appointed 2-bedroom, 2-full-bath condo is the perfect retreat. It boasts a spacious terrace overlooking the lush golf course and the sparkling ocean. The fully equipped kitchen includes a refrigerator, gas stove with oven, dishwasher, microwave, and convenient washer and dryer. You'll find a charming dining table set with Mexican-style tableware, and a comfortable living room featuring four reclining armchairs, a TV, and a cozy fireplace. A dedicated desk with a power strip and ample outlets ensures a seamless work environment. The master bedroom offers a luxurious king-size bed and a private bathroom with a shower, double sink, and closet. The second bedroom is furnished with a queen bed, closet, and a practical working desk with a printer. The adjacent bathroom is connected to and shared with the living area. Step out onto the terrace to enjoy outdoor dining with a BBQ grill and sink, perfect for savoring the Cabo evenings. Complimentary parking is available at the Copala tower complex in any unassigned spaces. For your convenience, several handicap spaces are located near the building entry, and all entrances are equipped with accessible ramps. A free shuttle service can be reserved every half hour through the Quivira concierge, providing easy access to all the hotels and resorts on the property. Additionally, a free hourly bus service to downtown Pueblo Bonito Rose and Blanco is available, though reservations are recommended due to its popularity. This exceptional condo is easy to show, so please don't hesitate to inquire.

MLSCSLP: 25-4675
OVERVIEW: Welcome to your ideal condo in the exclusive Copala community, part of the Quivira resort in Cabo San Lucas. This two-bedroom, two-bathroom home offers stunning, unobstructed views stretching from the pool to the ocean and overlooks the Jack Nicklaus Signature Golf Course. Fully furnished and move-in ready, the condo includes a private jacuzzi, outdoor barbecue, and outdoor space designed for relaxation and entertaining. Residents of Copala enjoy a wide range of premium amenities, including seven pools, fitness center, restaurant, movie theater, spa, and concierge service. Homeowners also have access to the private Quivira Beach Club, Copala Day Club and receive special discounts on golf, dining, and services at Pueblo Bonito restaurants and resorts. A convenient shuttle runs every hour, connecting the community to nearby destinations such as Pueblo Bonito Sunset, Pacifica, Montecristo, and the beachside Blanco and Rose resorts at Medano Beach.

Datos de contacto de Angelo:
- WhatsApp: https://wa.me/526244334131
- Teléfono: +52 624 433 4131
- Email: angelo@caboapp.com
- Web: https://sell.cabosaintlucas.properties

Cuando el usuario muestre interés serio en una propiedad, siempre invítalo a conectar con Angelo directamente.`
          },
          ...messages
        ],
        max_tokens: 600,
        temperature: 0.75
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (error) {
    console.error('xAI proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

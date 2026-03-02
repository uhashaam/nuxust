
import { batchCreateRecords } from '../../utils/lark/base';

// List of ~68 B2B Industries
const INDUSTRIES = [
    "CNC Machining", "Injection Molding", "Sheet Metal Fabrication", "3D Printing",
    "Die Casting", "Vacuum Casting", "Plastic Extrusion", "Aluminum Extrusion",
    "Forging Services", "Stamping Services", "Laser Cutting", "Waterjet Cutting",
    "Plasma Cutting", "EDM Machining", "Swiss Machining", "Turning Services",
    "Milling Services", "Surface Finishing", "Anodizing Services", "Powder Coating",
    "Electroplating", "Heat Treating", "Welding Services", "Assembly Services",
    "PCB Assembly", "PCB Manufacturing", "Cable Assembly", "Wire Harness",
    "Box Build Assembly", "Plastic Molding", "Rubber Molding", "Silicone Molding",
    "Blow Molding", "Rotational Molding", "Thermoforming", "Packaging Machinery",
    "Food Processing Machinery", "Textile Machinery", "Construction Machinery",
    "Agricultural Machinery", "Mining Machinery", "Material Handling",
    "Industrial Robots", "Automation Systems", "Conveyor Systems", "Pumps & Valves",
    "Hydraulic Systems", "Pneumatic Systems", "Bearings & Gears", "Fasteners",
    "Industrial Motors", "Power Supplies", "Sensors & Controls", "Testing Equipment",
    "Lab Equipment", "Medical Device Mfg", "Automotive Parts", "Aerospace Parts",
    "Marine Parts", "Railway Parts", "Energy Equipment", "Solar Components",
    "Wind Components", "Battery Manufacturing", "Chemical Processing",
    "Pharmaceutical Mfg", "Printing Services", "Logistics Services"
];

const generateSubdomain = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20); // Simple slug
};

// Randomly assign styles for variety
const getRandomStyle = (max: number) => Math.floor(Math.random() * max) + 1;

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const appToken = config.larkBaseAppToken;
    const tableId = config.public.larkTableIndustrySites;

    if (!appToken || !tableId) {
        throw createError({ statusCode: 500, statusMessage: 'Lark Config missing' });
    }

    const records = INDUSTRIES.map(industry => ({
        fields: {
            "Industry Name": industry,
            "Subdomain": generateSubdomain(industry),
            "SSL Status": "Pending", // Default
            "Header Style ID": getRandomStyle(5), // Using 1-5 for now as we're refining them
            "Footer Style ID": getRandomStyle(5),
            "Banner Style ID": getRandomStyle(3),
            "News Detail Style ID": "01",
            "News List Style ID": "01",
            "Site Status": "Enabled",
            "AI News Generation Toggle": true
        }
    }));

    try {
        // Process in chunks of 50 to be safe (Lark limit is often 50 or 100)
        const chunkSize = 50;
        const results = [];

        for (let i = 0; i < records.length; i += chunkSize) {
            const chunk = records.slice(i, i + chunkSize);
            const chunkResults = await batchCreateRecords(appToken, tableId, chunk);
            results.push(...chunkResults);
        }

        return { success: true, count: results.length, message: "Industries seeded" };
    } catch (error: any) {
        
        throw createError({ statusCode: 500, statusMessage: error.message });
    }
});

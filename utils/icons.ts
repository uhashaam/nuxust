/**
 * Maps industry names to Element Plus icons for visual consistency.
 */
export const getIndustryIcon = (industryName: string): string => {
    const name = (industryName || '').toUpperCase();

    if (name.includes('ELECTRONICS') || name.includes('SEMICONDUCTOR') || name.includes('CIRCUIT')) return 'Cpu';
    if (name.includes('VALVE') || name.includes('FITTING') || name.includes('FASTENER') || name.includes('MOLD') || name.includes('CASTING')) return 'Setting';
    if (name.includes('PUMP') || name.includes('GEAR') || name.includes('COMPRESSOR') || name.includes('HYDRAULIC') || name.includes('PNEUMATIC')) return 'Operation';
    if (name.includes('LIGHT') || name.includes('OPTICAL') || name.includes('OPTOELECTRONIC')) return 'Sunny';
    if (name.includes('INSTRUMENT') || name.includes('SECURITY') || name.includes('CCTV') || name.includes('ALARM') || name.includes('LOCK')) return 'Odometer';
    if (name.includes('APPLIANCE') || name.includes('BATTERY') || name.includes('CONNECTOR') || name.includes('CABLE')) return 'Connection';
    if (name.includes('SAFETY')) return 'Shield';

    return 'Menu';
};

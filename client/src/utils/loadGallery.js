export const loadGalleryImages = () => {
    const context = import.meta.glob('../assets/gallery/*.{jpg,jpeg,png}', { eager: true });
    return Object.values(context).map((m) => m.default);
};

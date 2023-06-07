export default function resetPasswordLoader({ params }) {
    const { token } = params;

    return { token };
}
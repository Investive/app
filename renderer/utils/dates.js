export default function formatDate(string) {
    var options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(string).toLocaleDateString('en-US', options);
}
export function ellipsis(value: string): string {
    if (!value) {
      return "";
    }
    const len = value.length;
    if (!value) return '';
    if (value.length > 20) {
      return `${value.substring(0, 10)}......${value.substring(len - 5, len)}`;
    }
    return value;
  }

  export  function openLink(chainName, value, type, explorer) {

    if (explorer) {
        
        const url = `${explorer}${type}/${value}`;

        window.open(url, '_blank');
    } else {
        console.error("Invalid parameters.");
    }
}

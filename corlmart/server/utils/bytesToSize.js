export const bytesToSize=(bytes)=>{
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return 'n/a'
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
  if (i === 0) return `${bytes} ${sizes[i]})`
  return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
}

export  function convertToBytes(sizeString) {
  // Extract number and unit from the size string
  let [size, unit] = sizeString.split(" ");
  size = parseFloat(size);
  
  // Define conversion factors for different units to bytes
  const units = {
      "B": 1,
      "KB": 1024,
      "MB": 1024 * 1024,
      "GB": 1024 * 1024 * 1024
  };

  // Convert size to bytes using the appropriate conversion factor
  return size * units[unit];
}
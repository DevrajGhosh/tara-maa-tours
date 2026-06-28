const [password, setPassword] = useState('');
const [authenticated, setAuthenticated] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('name', form.name);
  formData.append('region', form.region);
  formData.append('price', form.price);
  formData.append('itinerary', JSON.stringify(form.itinerary)); // array
  formData.append('highlights', JSON.stringify(form.highlights));
  formData.append('inclusions', JSON.stringify(form.inclusions));
  formData.append('exclusions', JSON.stringify(form.exclusions));
  formData.append('image', imageFile);  // file input

  await fetch(`${API_URL}/api/tours`, {
    method: 'POST',
    headers: { 'x-admin-password': password },
    body: formData,
  });
  alert('Tour added! ✅');
};
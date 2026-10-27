const API_URL = 'http://localhost:4000/';
const list = document.getElementById('list');
const statusBox = document.getElementById('status');
const authorSelect = document.getElementById('authorId');
const form = document.getElementById('addForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

async function gql(query, variables = {}) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(payload.errors?.map(e => e.message).join('; ') || 'Request failed.');
  }
  return payload.data;
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

async function loadAuthors() {
  statusBox.classList.remove('error');
  statusBox.textContent = 'Loading library data…';
  try {
    const data = await gql(`query {
      authors { id name country books { id title year } }
    }`);
    list.innerHTML = data.authors.map(author => `
      <article class="author-card">
        <h3>${escapeHtml(author.name)}</h3>
        <div class="country">${escapeHtml(author.country || 'Country not specified')}</div>
        ${author.books.length
          ? author.books.map(book => `<div class="book"><span>${escapeHtml(book.title)}</span><span class="year">${book.year ?? 'Year N/A'}</span></div>`).join('')
          : '<p class="empty">No books added yet.</p>'}
      </article>`).join('') || '<p class="empty">No authors found. Run schema.sql first.</p>';

    authorSelect.innerHTML = data.authors.map(author =>
      `<option value="${escapeHtml(author.id)}">${escapeHtml(author.name)}</option>`
    ).join('');
    statusBox.textContent = `Connected successfully · ${data.authors.length} author(s) loaded.`;
  } catch (error) {
    statusBox.classList.add('error');
    statusBox.textContent = `Could not load data. Make sure MySQL and the GraphQL API are running. Details: ${error.message}`;
    list.innerHTML = '';
    authorSelect.innerHTML = '<option value="">API unavailable</option>';
  }
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  formMessage.classList.remove('error');
  formMessage.textContent = '';
  const title = document.getElementById('title').value.trim();
  const yearInput = document.getElementById('year').value;
  const authorId = authorSelect.value;
  if (!title || !authorId) {
    formMessage.classList.add('error');
    formMessage.textContent = 'Please enter a title and choose an author.';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = 'Saving…';
  try {
    await gql(`mutation AddBook($title: String!, $year: Int, $authorId: ID!) {
      addBook(title: $title, year: $year, authorId: $authorId) { id title }
    }`, {
      title,
      year: yearInput ? Number(yearInput) : null,
      authorId
    });
    form.reset();
    formMessage.textContent = 'Book saved to MySQL successfully.';
    await loadAuthors();
  } catch (error) {
    formMessage.classList.add('error');
    formMessage.textContent = `Could not add book: ${error.message}`;
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Add book';
  }
});

document.getElementById('refreshBtn').addEventListener('click', loadAuthors);
loadAuthors();

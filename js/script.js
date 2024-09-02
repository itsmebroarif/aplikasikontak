// Fungsi untuk menghasilkan ID acak
function generateRandomID(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Fungsi untuk menyimpan kontak
function saveContact() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const id = document.getElementById('id').value || generateRandomID(7);
    const notes = document.getElementById('notes').value;
    const editIndex = document.getElementById('editIndex').value;

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
    if (editIndex !== '') {
        // Update kontak
        contacts[editIndex] = { name, phone, id, notes };
        Swal.fire({
            icon: 'success',
            title: 'Kontak Diperbarui',
            text: 'Kontak telah berhasil diperbarui!',
        });
    } else {
        // Tambah kontak
        contacts.push({ name, phone, id, notes });
        Swal.fire({
            icon: 'success',
            title: 'Kontak Ditambahkan',
            text: 'Kontak baru telah berhasil ditambahkan!',
        });
    }
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
    document.getElementById('contactForm').reset();
    document.getElementById('id').value = generateRandomID(7);
    document.getElementById('editIndex').value = '';
}

// Fungsi untuk merender kontak dari localStorage
function renderContacts() {
    const contactCards = document.getElementById('contactCards');
    contactCards.innerHTML = '';

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    contacts.forEach((contact, index) => {
        const contactCard = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${contact.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${contact.phone}</h6>
                    <p class="card-text"><strong>ID:</strong> ${contact.id}</p>
                    <p class="card-text"><strong>Catatan:</strong> ${contact.notes}</p>
                    <button class="btn btn-warning btn-sm" onclick="editContact(${index})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteContact(${index})">Hapus</button>
                </div>
            </div>
        `;
        contactCards.innerHTML += contactCard;
    });
}

// Fungsi untuk mengedit kontak
function editContact(index) {
    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const contact = contacts[index];

    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('id').value = contact.id;
    document.getElementById('notes').value = contact.notes;
    document.getElementById('editIndex').value = index;
}

// Fungsi untuk menghapus kontak
function deleteContact(index) {
    Swal.fire({
        title: 'Anda Yakin?',
        text: "Kontak ini akan dihapus!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, hapus!',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            let contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            renderContacts();
            Swal.fire(
                'Terhapus!',
                'Kontak telah dihapus.',
                'success'
            );
        }
    });
}

// Set ID random dan render kontak saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('id').value = generateRandomID(7);
    renderContacts(); // Render kontak dari localStorage saat halaman dimuat
});

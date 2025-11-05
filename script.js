$(document).ready(function() {
    const API_BASE_URL = 'http://localhost:8000/api';
    let exhibitors = [];
    let currentSort = '';

    loadExhibitors();

    $('#searchInput').on('input', function() {
        const searchTerm = $(this).val().trim();
        loadExhibitors(searchTerm, currentSort);
    });

    $('#sortSelect').on('change', function() {
        currentSort = $(this).val();
        const searchTerm = $('#searchInput').val().trim();
        loadExhibitors(searchTerm, currentSort);
    });

    $('#addExhibitorForm').on('submit', function(e) {
        e.preventDefault();
        return false;
    });

    $('#addExhibitorBtn').on('click', function(e) {
        e.preventDefault();

        const name = $('#name').val();
        const country = $('#country').val();
        const category = $('#category').val();
        const website = $('#website').val();

        const exhibitorData = {
            name: name ? name.trim() : '',
            country: country ? country.trim() : '',
            category: category ? category.trim() : '',
            website: website ? website.trim() : ''
        };

        if (!exhibitorData.name || !exhibitorData.country || !exhibitorData.category) {
            alert('Please fill in all required fields.');
            return;
        }

        createExhibitor(exhibitorData);
    });

    $('#updateExhibitorBtn').on('click', function() {
        const id = $('#editId').val();
        const exhibitorData = {
            name: $('#editName').val().trim(),
            country: $('#editCountry').val().trim(),
            category: $('#editCategory').val().trim(),
            website: $('#editWebsite').val().trim()
        };

        if (!exhibitorData.name || !exhibitorData.country || !exhibitorData.category) {
            alert('Please fill in all required fields.');
            return;
        }

        updateExhibitor(id, exhibitorData);
    });

    $('#confirmDeleteBtn').on('click', function() {
        const id = $(this).data('id');
        deleteExhibitor(id);
    });

    function loadExhibitors(searchTerm = '', sortBy = '') {
        showLoading();

        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (sortBy) params.sort = sortBy;

        $.ajax({
            url: `${API_BASE_URL}/exhibitors`,
            method: 'GET',
            data: params,
            success: function(data) {
                exhibitors = Array.isArray(data) ? data : [];
                displayExhibitors(exhibitors);
                hideLoading();
            },
            error: function(xhr, status, error) {
                console.error('Error loading exhibitors:', error);
                hideLoading();
                showError('Failed to load exhibitors. Please check if the backend server is running.');
            }
        });
    }
    
    function displayExhibitors(exhibitorsToDisplay) {
        const tbody = $('#exhibitorsTableBody');
        tbody.empty();

        if (!Array.isArray(exhibitorsToDisplay) || exhibitorsToDisplay.length === 0) {
            $('#noDataMessage').show();
            $('#exhibitorsTable').hide();
            return;
        }

        $('#noDataMessage').hide();
        $('#exhibitorsTable').show();

        exhibitorsToDisplay.forEach(exhibitor => {
            if (!exhibitor) return;

            const websiteBtn = exhibitor.website ?
                `<button class="btn btn-sm btn-outline-primary me-1" onclick="window.open('${exhibitor.website}', '_blank')">
                    <i class="fas fa-external-link-alt"></i> View Website
                </button>` :
                '<span class="text-muted">No website</span>';

            const row = `
                <tr>
                    <td>${exhibitor.id || 'N/A'}</td>
                    <td>${exhibitor.name || 'N/A'}</td>
                    <td>${exhibitor.country || 'N/A'}</td>
                    <td>${exhibitor.category || 'N/A'}</td>
                    <td>${websiteBtn}</td>
                    <td>
                        <button class="btn btn-sm btn-outline-warning me-1" onclick="editExhibitor(${exhibitor.id})">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="confirmDelete(${exhibitor.id}, '${exhibitor.name || 'this exhibitor'}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </td>
                </tr>
            `;
            tbody.append(row);
        });
    }

    function createExhibitor(exhibitorData) {

        console.log('Exhibitor data:', exhibitorData);

        $.ajax({
            url: `${API_BASE_URL}/exhibitors`,
            method: 'POST',
            data: JSON.stringify(exhibitorData),
            contentType: 'application/json',
            success: function(data, status, xhr) {

                loadExhibitors();

                $('#addExhibitorModal').modal('hide');
                $('#addExhibitorForm')[0].reset();

                showSuccess('Exhibitor added successfully!');
            },
            error: function(xhr, status, error) {
                alert('Failed to add exhibitor. Please try again.');
            }
        });
    }

    function updateExhibitor(id, exhibitorData) {
        $.ajax({
            url: `${API_BASE_URL}/exhibitors/${id}`,
            method: 'PUT',
            data: JSON.stringify(exhibitorData),
            contentType: 'application/json',
            success: function(data) {
                const index = exhibitors.findIndex(e => e.id == id);
                if (index !== -1) {
                    exhibitors[index] = data;
                }

                loadExhibitors();

                $('#editExhibitorModal').modal('hide');
                showSuccess('Exhibitor updated successfully!');
            },
            error: function(xhr, status, error) {
                console.error('Error updating exhibitor:', error);
                alert('Failed to update exhibitor. Please try again.');
            }
        });
    }

    function deleteExhibitor(id) {
        $.ajax({
            url: `${API_BASE_URL}/exhibitors/${id}`,
            method: 'DELETE',
            success: function() {
                loadExhibitors($('#searchInput').val().trim(), currentSort);
                $('#deleteExhibitorModal').modal('hide');
                showSuccess('Exhibitor deleted successfully!');
            },
            error: function(xhr, status, error) {
                console.error('Error deleting exhibitor:', error);
                alert('Failed to delete exhibitor. Please try again.');
            }
        });
    }

    function showLoading() {
        $('#loadingSpinner').show();
        $('#exhibitorsTable').hide();
        $('#noDataMessage').hide();
    }

    function hideLoading() {
        $('#loadingSpinner').hide();
    }

    function showError(message) {
        alert(message);
    }

    function showSuccess(message) {
        alert(message);
    }

    window.editExhibitor = function(id) {
        const exhibitor = exhibitors.find(e => e.id == id);
        if (exhibitor) {
            $('#editId').val(exhibitor.id);
            $('#editName').val(exhibitor.name);
            $('#editCountry').val(exhibitor.country);
            $('#editCategory').val(exhibitor.category);
            $('#editWebsite').val(exhibitor.website || '');
            $('#editExhibitorModal').modal('show');
        }
    };

    window.confirmDelete = function(id, name) {
        $('#deleteExhibitorName').text(name);
        $('#confirmDeleteBtn').data('id', id);
        $('#deleteExhibitorModal').modal('show');
    };
});

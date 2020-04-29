// Call the dataTables jQuery plugin
$(document).ready(function () {
    $('#dataTable').DataTable({
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Hebrew.json"
        }

    });
});

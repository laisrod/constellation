document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const resultDiv = document.getElementById('result');

        // Mostra mensagem de "enviando"
        resultDiv.innerHTML = '<div class="alert alert-info">Bericht verzenden...</div>';

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                // Sucesso
                resultDiv.innerHTML = '<div class="alert alert-success">Bericht succesvol verzonden! We nemen binnenkort contact met u op.</div>';
                form.reset();
            } else {
                // Erro
                throw new Error('Erro no envio');
            }
        })
        .catch(error => {
            resultDiv.innerHTML = '<div class="alert alert-danger">Fout bij verzenden van bericht. Probeer het opnieuw.</div>';
            console.error('Erro:', error);
        });
    });
});


// handling solve button
document.getElementById('solve').addEventListener('click', (e) => {
    const solveButton = document.getElementById('SOLVE');

    let processNames = document.getElementsByClassName('input-a');
    let arrivalTimes = document.getElementsByClassName('input-b');
    let burstTimes = document.getElementsByClassName('input-c');

    let arr = [];
    for(let i=0; i<processNames.length; i++){
        let temp = {}
        temp.job = processNames[i].target.value;
        temp.at = arrivalTimes[i].target.value;
        temp.bt = burstTimes[i].target.value;

        arr.push(temp);
    }

    var active = undefined,
        queue = [],
        final = [],
        totalBurst = 0,
        currentBurst = 0;

    // Get the total burst time
    $.map(arr, function(job, index) {
        arr[index].runTime = arr[index].bt;
        totalBurst += job.bt + job.at;
    });

    // This loop simulates time
    for (var i = 0; i < totalBurst; i+=1) {
        if (typeof active === 'object') {
            active.runTime -= 1;
            
            if (active.runTime < 1) {
                final.push({ job : active.job, start : active.start, end : i});
                active = undefined;
            }
        }
        
        // Get array of jobs recieved at this time signature
        var toProcess,
            jobs = $.grep(arr, function(job, index) {
                return job.at === i;
            });
        
        // Merge new jobs into queue
        queue = queue.concat(jobs);    
        // Sort the queue
        queue.sort(function(a,b) {
            return a.bt < b.bt ? -1 : 1;
        });
        
        // Get the job to process next
        toProcess = queue.splice(0,1)[0];
        
        if (typeof toProcess !== 'undefined') {
            // Process active job
            if (typeof active === 'undefined' && typeof toProcess !== 'undefined') {
                // Automatically start the first job in the queue
                toProcess.start = i;
                active = toProcess;
            } else if( typeof toProcess !== 'undefined' && active.bt > toProcess.bt ) {
                // Push active time to final array
                final.push({ job : active.job, start : active.start, end : i});
                // If active still has time to run add it to queue
                if (active.runTime > 0) {
                    queue.push(active);
                }
                
                // Create new active process
                toProcess.start = i;
                active = toProcess;
            } else if( typeof toProcess !== 'undefined') {
                // Otherwise we still have an active process
                // Push the toProcess back on the queue
                queue.push(toProcess);
            }
        }    
    }

    var jobSingle = $('.singleJob').remove(),
        container = $('#container tbody');

    $.each(final, function(index, job) {
        var el = jobSingle.clone();
        
        el.children().first().text(job.job)
            .next().text(job.start)
            .next().text(job.end);

        container.append(el);
    });

    console.log('Solved !!!')
})

// handling number of processes -> showing input boxes according to number of processes

document.getElementById('number_of_processes').addEventListener('change', (e) => {
    const numberOfProcessesInput = document.getElementById('number_of_processes');
    const count = numberOfProcessesInput.value;
    let totalCount = 1;

    function containsNumbers(str) {
        return /[0-9]/.test(str);
    }
      
    if(!containsNumbers(count)) return;
    else totalCount = Number(count)

    document.getElementById('inputs').innerHTML = '';

    for(let i=0; i<totalCount; i++){
        document.getElementById('inputs').innerHTML += "<div style='display: flex; justify-content: space-between; width: 800px;'><input placeholder='enter process name...'><input placeholder='enter arrival time...'><input placeholder='enter burst time...'></div>"
    }
})
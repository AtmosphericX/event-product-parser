/*
              _                             _               _     __   __
         /\  | |                           | |             (_)    \ \ / /
        /  \ | |_ _ __ ___   ___  ___ _ __ | |__   ___ _ __ _  ___ \ V / 
       / /\ \| __| '_ ` _ \ / _ \/ __| '_ \| '_ \ / _ \ '__| |/ __| > <  
      / ____ \ |_| | | | | | (_) \__ \ |_) | | | |  __/ |  | | (__ / . \ 
     /_/    \_\__|_| |_| |_|\___/|___/ .__/|_| |_|\___|_|  |_|\___/_/ \_\
                                     | |                            
                                     |_|    
                                                        
    Created with ❤️ by the Project AtmosphericX Team (KiyoWx, CJZiegler, StarflightWx)
    Ko-Fi: https://ko-fi.com/k3yomi

*/

export type QUEUE_TASK = () => Promise<void>;
export interface QUEUE_MANAGER_OPTIONS {
    Concurrency?: number;
    Error?: (error: unknown) => void;
}

export class QueueManager {
    private readonly prQueue: QUEUE_TASK[] = [];
    private readonly prConcurrency: number;
    private pRunning = 0;
    private pDraining = false;

    public constructor({ Concurrency }: QUEUE_MANAGER_OPTIONS = {}) {
        this.prConcurrency = Concurrency ?? 1;
    }

    public Enqueue(task: QUEUE_TASK): void {
        this.prQueue.push(task);
        this.DrainTask();
    }

    private DrainTask(): void {
        if (this.pDraining) { return; }
        this.pDraining = true;
        while (this.pRunning < this.prConcurrency && this.prQueue.length > 0) {
            const task = this.prQueue.shift();
            if (!task) { continue; }
            this.pRunning++;
            void this.ExecuteTask(task);
        }
        this.pDraining = false;
    }

    private async ExecuteTask(task: QUEUE_TASK): Promise<void> {
        try {
            await task();
        } catch (_) {
        } finally {
            this.pRunning--;
            this.DrainTask();
        }
    }
}
#include<iostream>
#include <random>

using namespace std;


int randomInt(int low, int high) {
    static thread_local std::mt19937 rng(std::random_device{}()); // good seed, per-thread engine
    std::uniform_int_distribution<int> dist(low, high);
    return dist(rng);
}

int partition(int arr[],int low,int high){
    int pivot = arr[low];

    int i = low, j = high;
   while(i<j){
     do
    {
        i++;
    } while (arr[i] <= pivot);

    do{
        j--;
    } while (arr[j] > pivot);

    if (i<j){
        swap(arr[i], arr[j]);
    }

   }
   swap(arr[low], arr[j]);
   return j;
}

void quickSort(int arr[], int low, int high){

    if (low<high){
        int part = partition(arr, low, high);
        quickSort(arr,low, part);
        quickSort(arr,part + 1, high);
    }
}

int main(){

    int n = 20;
    int arr[n];

    cout << "Unsorted Array " << endl;
    for (int i = 0; i < n; i++)
    {
        int random = randomInt(1, 843);
        arr[i] = random;
        cout << random << " ";
    }
   
    cout << endl;
    cout << "Sorted Array " << endl;

    quickSort(arr, 0,n);

    for (int i = 0; i < n;i++){
        cout << arr[i] << " ";
    }

        return 0;
}
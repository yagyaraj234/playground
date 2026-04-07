#include <iostream>
#include <cstdlib>
using namespace std;

// Problem: How to find the missing number in integer array of 1 to 100?
int main() {

    int arr[100]={0};
    int temp[100]={0};

    for(int it=0;it<100;it++){

        int random_num=(rand() % 100) + 1;
        arr[it]=random_num;
        cout<<" "<<random_num;
    }

    for(int i=0;i<100;i++){
        int num = arr[i];
        arr[num-1]= num;
        arr[i]=-1;
        cout<<" "<<arr[i];
    }
    return 0;
}
